import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const merkleroot = "0x7ba4feb24f3dc57bce5e62d8381beec451fcf1e64966f8fe8364adf55e9de87b"
const tokenAddress = "0x7146C58628F8Cf34127e52f19b2f8db3E867ed1a";

const MerkleAirdropModule = buildModule("MerkleAirdropModule", (m) => {

    const airdrop = m.contract("MerkleAirdrop", [merkleroot, tokenAddress]);

    return { airdrop };
});

export default MerkleAirdropModule;