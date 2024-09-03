import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import csvParser from "csv-parser";
import { isAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";

// Define the data array
const values: [string, BigNumber, BigNumber][] = [];

// Read and parse the CSV file
fs.createReadStream("airdrop_data.csv")
  .pipe(csvParser())
  .on("data", (row) => {
    try {
      const address = row.address.trim();
      const index = BigNumber.from(row.index);
      const amount = BigNumber.from(row.amount);

      // Validate Ethereum address
      if (!isAddress(address)) {
        console.error(`Invalid address: ${address}`);
        return;
      }

      // Add to values array
      values.push([address, index, amount]);
    } catch (error) {
      console.error("Error processing row:", row, error);
    }
  })
  .on("end", () => {
    try {
      // Prepare the data for the Merkle tree
      const formattedValues = values.map(([address, index, amount]) => [
        address,
        index.toString(),
        amount.toString(),
      ]);

      // Generate the Merkle tree using OpenZeppelin's library
      const tree = StandardMerkleTree.of(formattedValues, ["address", "uint256", "uint256"]);

      console.log("Merkle Root:", tree.root);

      // Save the Merkle tree to a file
      fs.writeFileSync("tree.json", JSON.stringify(tree.dump(), null, 2));
      console.log(tree);
      // Verify entries and generate proofs if needed
      for (const [i, v] of tree.entries()) {
        if (v[0] === '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4') {
          const proof = tree.getProof(i);
          console.log('Value:', v);
          console.log('Proof:', proof);
        }
      }
    } catch (error) {
      console.error("Error generating Merkle tree:", error);
    }
  });
