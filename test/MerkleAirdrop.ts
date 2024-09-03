import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("MerkleAirdrop", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMerkleAirdropFixture() {
    const merkleroot = "0x0ce150a7a3bc7fee1c6e725ac40c09873e0ebd9a93d2559c11bebc1fe4eb7c47"
    const tokenAddress = "0x7146C58628F8Cf34127e52f19b2f8db3E867ed1a";

    // Contracts are deployed using the first signer/account by default
    const [owner] = await hre.ethers.getSigners();

    const MerkleAirdrop = await hre.ethers.getContractFactory("MerkleAirdrop");
    const merkleAirdrop = await MerkleAirdrop.deploy(merkleroot, tokenAddress);

    return { merkleAirdrop, owner,  merkleroot, tokenAddress};
  }

  describe("Deployment", function () {
    it("Should check if owner is correct", async function () {
      const { merkleAirdrop, owner } = await loadFixture(deployMerkleAirdropFixture);

      expect(await merkleAirdrop.owner()).to.equal(owner);
    });

    it("Should check if token address is correctly set", async function () {
      const { merkleAirdrop, tokenAddress } = await loadFixture(deployMerkleAirdropFixture);

      expect(await merkleAirdrop.airdropToken()).to.equal(tokenAddress);
    });
  });

  describe("Claim", function () {
    it("Should check if owner is correct", async function () {
      const { saveErc20, owner } = await loadFixture(deploySaveERC20);

      expect(await saveErc20.owner()).to.equal(owner);
    });

    it("Should check if tokenAddress is correctly set", async function () {
      const { saveErc20, owner, token } = await loadFixture(deploySaveERC20);

      expect(await saveErc20.tokenAddress()).to.equal(token);
    });
  });

});
