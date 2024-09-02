// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/structs/BitMaps.sol";

contract MerkleAirdrop {
    address public owner;
    bytes32 public immutable merkleRoot;
    BitMaps.BitMap private _airdropList;
    address public airdropToken;

    event AirdropClaimed(
        address indexed claimant,
        uint256 index,
        uint256 amount
    );

    constructor(bytes32 _merkleRoot, address _tokenAddress) {
        owner = msg.sender;
        merkleRoot = _merkleRoot;
        airdropToken = _tokenAddress;
    }

    function claimAirDrop(
        bytes32[] calldata proof,
        uint256 index,
        uint256 amount
    ) external {
        // Check if already claimed
        require(!BitMaps.get(_airdropList, index), "Already claimed");

        // Verify proof
        _verifyProof(proof, index, amount, msg.sender);

        // Set airdrop as claimed
        BitMaps.setTo(_airdropList, index, true);

        // Transfer tokens
        bool success = IERC20(airdropToken).transfer(msg.sender, amount);
        require(success, "Token transfer failed");

        // Emit event
        emit AirdropClaimed(msg.sender, index, amount);
    }

    function _verifyProof(
        bytes32[] memory proof,
        uint256 index,
        uint256 amount,
        address addr
    ) private view {
        bytes32 leaf = keccak256(
            bytes.concat(keccak256(abi.encode(addr, index, amount)))
        );
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");
    }
}
