# Merkle Airdrop Project

This project provides a complete setup for creating a Merkle tree-based airdrop, deploying a Merkle Airdrop smart contract, and generating proofs for claiming tokens. It includes a script to generate a Merkle tree from a CSV file of eligible addresses and a Solidity smart contract for handling the airdrop distribution.

## Table of Contents

<<<<<<< HEAD
- [Prerequisites](#prerequisites)
- [Setup and Running the Merkle.js Script](#setup-and-running-the-merklejs-script)
- [Deploying the MerkleAirdrop Contract](#deploying-the-merkleairdrop-contract)
- [Generating Proofs for Claiming the Airdrop](#generating-proofs-for-claiming-the-airdrop)
- [Assumptions and Limitations](#assumptions-and-limitations)
=======
1.  [Prerequisites](#prerequisites)
2.  [Setup and Running the Merkle.js Script](#setup-and-running-the-merklejs-script)
3.  [Deploying the MerkleAirdrop Contract](#deploying-the-merkleairdrop-contract)
4.  [Generating Proofs for Claiming the Airdrop](#generating-proofs-for-claiming-the-airdrop)
5.  [Assumptions and Limitations](#assumptions-and-limitations)
>>>>>>> eb9fc163e9c4201c5d3166635336560177c4a947

## Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)
- Hardhat
- A deployed ERC20 token contract
<<<<<<< HEAD
- A CSV file (`airdrop_data.csv`) containing the airdrop data with columns: address, index, amount

## Setup and Running the Merkle.js Script

### Clone the Repository

Clone this repository to your local machine:

````bash
git clone <repository-url>
cd <repository-directory>

## Setup and Running the Merkle.js Script

### Install Dependencies

Install the required npm packages by running:

```bash
npm install

## Prepare Your CSV File

Ensure that your `airdrop_data.csv` file is in the root directory of the project. The CSV should have three columns: address, index, and amount, where:
- `address` is the recipient's Ethereum address
- `index` is a unique index for each recipient (use sequential integers)
- `amount` is the number of tokens to be airdropped

## Run the Script

To generate the Merkle tree and save it to a file, run the following command in the Hardhat environment:

```bash
npx hardhat run <folder>/merkle.js

This script will parse the `airdrop_data.csv`, generate a Merkle tree, display the Merkle root in the console, and save the entire tree to `tree.json`.

## Deploying the MerkleAirdrop Contract

### Set Up Hardhat Environment

Ensure Hardhat is installed in your project:

```bash
npm install --save-dev hardhat

### Initialize Hardhat in Your Project Directory

```bash
npx hardhat init

### Configure Hardhat for Deployment

Update your Hardhat configuration (`hardhat.config.js`) to include the necessary network settings and compiler version. Ensure the network configurations are correct for the deployment (e.g., using a local network or testnet like Sepolia).

### Deploy the Contract

The MerkleAirdrop contract can be deployed using the Hardhat Ignition module script provided. The Merkle root and the address of the ERC20 token contract need to be set in `MerkleAirdrop.ts`.

Replace the placeholder values in `MerkleAirdrop.ts`:

```typescript
const merkleroot = "<your-merkle-root>";
const tokenAddress = "<your-token-address>";

Deploy the contract using the following command:

```bash
npx hardhat ignition deploy ./ignition/modules/<file.js> --network <network name>

Replace `<file.js>` with the name of your deployment script file and `<network name>` with the name of the network you're deploying to (e.g., lisk, sepolia).

## Generating Proofs for Claiming the Airdrop

### Use the merkle.js Script

After running `merkle.js`, proofs for claiming can be generated and displayed for a specific address within the script. For example, the script checks for a specific hardcoded address and generates a proof for it.

### Manual Proof Generation

To manually generate a proof, you can modify the loop at the end of `merkle.js` to match the address for which you want to generate a proof.

Replace the address `0x5B38Da6a701c568545dCfcB03FcB875f56beddC4` with the desired address:

```javascript
for (const [i, v] of tree.entries()) {
  if (v[0] === '<your-desired-address>') {
    const proof = tree.getProof(i);
    console.log('Value:', v);
    console.log('Proof:', proof);
  }
}

Run the script again to print the proof.

## Assumptions and Limitations

- **Data Format:** The CSV file must strictly follow the expected format with `address`, `index`, and `amount` columns. Incorrect formatting may cause the script to fail.
- **Fixed Merkle Root:** The Merkle root is hardcoded in the deployment script. Any changes to the airdrop data after deployment would require redeploying the contract with the new Merkle root.
- **One-Time Claim:** Once a claim is successfully made for a given index, it cannot be claimed again. This is enforced using a bitmap to track claimed indices.
- **Token Transfer:** The contract assumes that the ERC20 token used for the airdrop follows standard ERC20 behavior. Non-standard implementations may lead to transfer failures.
=======
- A CSV file (airdrop_data.csv) containing the airdrop data with columns: address, index, amount

## Setup and Running the Merkle.js Script

1.  Clone this repository to your local machine:bashCopy codegit clone cd
2.  Install the required npm packages by running:bashCopy codenpm install
3.  Ensure that your airdrop_data.csv file is in the root directory of the project. The CSV should have three columns: address, index, and amount, where:

    - address is the recipient's Ethereum address
    - index is a unique index for each recipient (use sequential integers)
    - amount is the number of tokens to be airdropped

4.  To generate the Merkle tree and save it to a file, run the following command in the Hardhat environment:bashCopy codenpx hardhat run /merkle.jsThis script will parse the airdrop_data.csv, generate a Merkle tree, display the Merkle root in the console, and save the entire tree to tree.json.

## Deploying the MerkleAirdrop Contract

1.  Ensure Hardhat is installed in your project:bashCopy codenpm install --save-dev hardhatInitialize Hardhat in your project directory:bashCopy codenpx hardhat
2.  Update your Hardhat configuration (hardhat.config.js) to include the necessary network settings and compiler version. Ensure the network configurations are correct for the deployment (e.g., using a local network or testnet like Sepolia).
3.  The MerkleAirdrop contract can be deployed using the Hardhat Ignition module script provided. The Merkle root and the address of the ERC20 token contract need to be set in MerkleAirdrop.ts.Replace the placeholder values in MerkleAirdrop.ts:typescriptCopy codeconst merkleroot = "";const tokenAddress = "";Deploy the contract using the following command:bashCopy codenpx hardhat ignition deploy ./ignition/modules/ --network Replace with the name of your deployment script file and with the name of the network you're deploying to (e.g., lisk, sepolia).

## Generating Proofs for Claiming the Airdrop

1.  After running merkle.js, proofs for claiming can be generated and displayed for a specific address within the script. For example, the script checks for a specific hardcoded address and generates a proof for it.
2.  To manually generate a proof, you can modify the loop at the end of merkle.js to match the address for which you want to generate a proof.Replace the address 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 with the desired address:javascriptCopy codefor (const \[i, v\] of tree.entries()) { if (v\[0\] === '') { const proof = tree.getProof(i); console.log('Value:', v); console.log('Proof:', proof); }}Run the script again to print the proof.

## Assumptions and Limitations

1.  **Data Format**: The CSV file must strictly follow the expected format with address, index, and amount columns. Incorrect formatting may cause the script to fail.
2.  **Fixed Merkle Root**: The Merkle root is hardcoded in the deployment script. Any changes to the airdrop data after deployment would require redeploying the contract with the new Merkle root.
3.  **One-Time Claim**: Once a claim is successfully made for a given index, it cannot be claimed again. This is enforced using a bitmap to track claimed indices.
4.  **Token Transfer**: The contract assumes that the ERC20 token used for the airdrop follows standard ERC20 behavior. Non-standard implementations may lead to transfer failures.
>>>>>>> eb9fc163e9c4201c5d3166635336560177c4a947

## Conclusion

This project provides a straightforward way to manage an airdrop using a Merkle tree for efficient verification and claiming. Follow the steps above to set up, deploy, and use the airdrop system. Make sure to update the Merkle root and token address appropriately to match your specific use case.
<<<<<<< HEAD
````
=======
>>>>>>> eb9fc163e9c4201c5d3166635336560177c4a947
