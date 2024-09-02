import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AirdropTokenModule = buildModule("AirdropTokenModule", (m) => {

    const erc20 = m.contract("AirdropToken");

    return { erc20 };
});

export default AirdropTokenModule;
