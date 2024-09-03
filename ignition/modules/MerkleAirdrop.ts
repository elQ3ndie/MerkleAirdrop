import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const merkleroot = "0x0ce150a7a3bc7fee1c6e725ac40c09873e0ebd9a93d2559c11bebc1fe4eb7c47"
const tokenAddress = "0x7146C58628F8Cf34127e52f19b2f8db3E867ed1a";

const MerkleAirdropModule = buildModule("MerkleAirdropModule", (m) => {

    const airdrop = m.contract("MerkleAirdrop", [merkleroot, tokenAddress]);

    return { airdrop };
});

export default MerkleAirdropModule;