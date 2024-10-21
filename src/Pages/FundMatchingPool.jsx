import React, { useState } from "react";
import { ethers, Contract } from "ethers";
import { useEthers } from "@usedapp/core";
import quadraticFunding from "../../smart_contract/artifacts/contracts/QuadraticFunding.sol/QuadraticFunding.json";

function FundMatchingPool() {
  const { account, library } = useEthers(); // Get account and library from useEthers
  const [amount, setAmount] = useState(""); // State for the amount to add to the matching pool
  const [loading, setLoading] = useState(false); // State for loading status
  const contractAddress = "0x8dA1b69c7fc6a7e889Dba825b8E7848d8E48aEA8"; // Your contract address

  const handleAddToMatchingPool = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (!library || !account) {
      alert("Please connect your wallet first.");
      return;
    }

    setLoading(true); // Set loading to true
    try {
      const signer = library.getSigner(account); // Get the signer
      const contract = new Contract(
        contractAddress,
        quadraticFunding.abi,
        signer
      ); // Create contract instance

      const tx = await contract.addToMatchingPool({
        value: ethers.utils.parseEther(amount), // Convert amount to wei
      });
      await tx.wait(); // Wait for the transaction to be mined
      alert("Amount added to the matching pool successfully!"); // Success message
      setAmount(""); // Reset amount input
    } catch (error) {
      console.error("Error adding to matching pool:", error);
      alert(`Failed to add to matching pool! Error: ${error.message}`); // Error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-white mb-4">
        Add to Matching Pool
      </h1>
      <form
        onSubmit={handleAddToMatchingPool}
        className="flex flex-col items-center"
      >
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} // Update amount state
          placeholder="Amount in ETH"
          className="border p-2 rounded mb-2"
          required
        />
        <button
          type="submit"
          className="bg-secondary text-white p-3 rounded-lg"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Adding..." : "Add to Matching Pool"}
        </button>
      </form>
    </div>
  );
}

export default FundMatchingPool;
