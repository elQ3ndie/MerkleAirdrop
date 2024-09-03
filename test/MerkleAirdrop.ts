import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

describe("MerkleAirdrop", function () {
  async function deployMerkleAirdropFixture() {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.

    // Accounts
    const [owner, user1] = await hre.ethers.getSigners();

    // Sample airdrop data
    const airdropData = [
      { address: user1.address, index: 0, amount: 100 }
    ];

    // Create leaves and Merkle tree
    const leaves = airdropData.map((x) =>
      keccak256(ethers.utils.defaultAbiCoder.encode(["address", "uint256", "uint256"], [x.address, x.index, x.amount]))
    );
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const merkleRoot = merkleTree.getHexRoot();

    const tokenAddress = "0x7146C58628F8Cf34127e52f19b2f8db3E867ed1a"; 
    // Deploy MerkleAirdrop contract
    const MerkleAirdrop = await hre.ethers.getContractFactory("MerkleAirdrop");
    const merkleAirdrop = await MerkleAirdrop.deploy(merkleRoot, tokenAddress);

    // We assume the AirdropToken contract has already transferred enough tokens to the MerkleAirdrop contract
    // No need to transfer tokens in this test setup

    return { merkleAirdrop, owner, user1, merkleTree, airdropData, tokenAddress };
  }

  describe("Deployment", function () {
    it("Should check if owner is correct", async function () {
      const { merkleAirdrop, owner } = await loadFixture(deployMerkleAirdropFixture);

      expect(await merkleAirdrop.owner()).to.equal(owner.address);
    });

    it("Should check if token address is correctly set", async function () {
      const { merkleAirdrop, tokenAddress } = await loadFixture(deployMerkleAirdropFixture);

      expect(await merkleAirdrop.airdropToken()).to.equal(tokenAddress);
    });
  });

  describe("Claim", function () {
    it("Should successfully claim airdrop", async function () {
      const { merkleAirdrop, user1, airdropData, merkleTree } = await loadFixture(deployMerkleAirdropFixture);

      const claim = airdropData[0];
      const leaf = keccak256(ethers.utils.defaultAbiCoder.encode(["address", "uint256", "uint256"], [claim.address, claim.index, claim.amount]));
      const proof = merkleTree.getHexProof(leaf);

      await expect(merkleAirdrop.connect(user1).claimAirDrop(proof, claim.index, claim.amount))
        .to.emit(merkleAirdrop, "AirdropClaimed")
        .withArgs(user1.address, claim.index, claim.amount);

      // Check the token balance after successful claim
      const token = await hre.ethers.getContractAt("AirdropToken", merkleAirdrop.airdropToken());
      const user1Balance = await token.balanceOf(user1.address);
      expect(user1Balance).to.equal(claim.amount);
    });

    it("Should fail if trying to claim twice", async function () {
      const { merkleAirdrop, user1, airdropData, merkleTree } = await loadFixture(deployMerkleAirdropFixture);

      const claim = airdropData[0];
      const leaf = keccak256(ethers.utils.defaultAbiCoder.encode(["address", "uint256", "uint256"], [claim.address, claim.index, claim.amount]));
      const proof = merkleTree.getHexProof(leaf);

      await merkleAirdrop.connect(user1).claimAirDrop(proof, claim.index, claim.amount);

      await expect(merkleAirdrop.connect(user1).claimAirDrop(proof, claim.index, claim.amount)).to.be.revertedWith("Already claimed");
    });

    it("Should fail with invalid proof", async function () {
      const { merkleAirdrop, user1, airdropData } = await loadFixture(deployMerkleAirdropFixture);

      const claim = airdropData[0];
      const invalidProof = ["0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"]; // Invalid proof

      await expect(merkleAirdrop.connect(user1).claimAirDrop(invalidProof, claim.index, claim.amount)).to.be.revertedWith("Invalid proof");
    });
  });
});
