import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import csvParser from "csv-parser";
import { isAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";

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
      // Generate the Merkle tree
      const tree = StandardMerkleTree.of(values, ["address", "uint256", "uint256"]);
      
      console.log("Merkle Root:", tree.root);
      
      // Save the Merkle tree to a file
      fs.writeFileSync("tree.json", JSON.stringify(tree.dump(), null, 2));

      // Verify entries and generate proofs if needed
      for (const [i, v] of tree.entries()) {
        if (v[0] === '0x1F4d253DD0E702C5353998C05298f9F3e550f8c7') {
          const proof = tree.getProof(i);
          console.log('Value:', v);
          console.log('Proof:', proof);
        }
      }
    } catch (error) {
      console.error("Error generating Merkle tree:", error);
    }
  });
