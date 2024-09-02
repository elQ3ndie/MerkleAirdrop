// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";

contract MerkleAirdrop {
    bytes32 public immutable merkleRoot;
    BitMaps.BitMap private _airdropList;
    IERC20 public airdropToken;

    constructor(bytes32 _merkleRoot, address _tokenAddress) {
        merkleRoot = _merkleRoot;
        airdropToken = IERC20(_tokenAddress);
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
        require(
            airdropToken.transfer(msg.sender, amount),
            "Token transfer failed"
        );
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
