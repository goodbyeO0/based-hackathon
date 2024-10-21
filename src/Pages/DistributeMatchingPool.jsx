import React, { useState } from "react";
import { ethers, Contract } from "ethers";
import { useEthers } from "@usedapp/core";
import quadraticFunding from "../../smart_contract/artifacts/contracts/QuadraticFunding.sol/QuadraticFunding.json";

function DistributeMatchingPool() {
  const { account, library } = useEthers();
  const [txHash, setTxHash] = useState("");
  const [emitProject, setEmitProject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const contractAddress = "0x8dA1b69c7fc6a7e889Dba825b8E7848d8E48aEA8";

  const handleDistributeMatchingPool = async () => {
    setIsLoading(true); // Set loading state
    try {
      const signer = library.getSigner(account);
      const contract = new Contract(
        contractAddress,
        quadraticFunding.abi,
        signer
      );

      const tx = await contract.distributeMatching();
      setTxHash(tx.hash);
      const receipt = await tx.wait(); // Wait for the transaction to be mined

      // Log the entire receipt to understand its structure
      console.log("Transaction receipt:", receipt);

      // Access the emitted event from the receipt
      const emitProject = receipt.events.find(
        (event) => event.event === "MatchingDistributed"
      );
      if (emitProject) {
        console.log(`emit createProjectEvent : ${emitProject.args}`);
        setEmitProject(emitProject.args);
      } else {
        console.log("ProjectCreated event not found in receipt");
      }
      alert("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      alert(`Failed to create project! Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  return (
    <>
      <div className=" h-screen w-screen flex justify-center items-center">
        <button
          onClick={handleDistributeMatchingPool}
          className="bg-secondary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Distribute MatchingPool
        </button>
      </div>
    </>
  );
}

export default DistributeMatchingPool;
