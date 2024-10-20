import React, { useState } from "react";
import { ethers, Contract } from "ethers";
import { useEthers } from "@usedapp/core";
import quadraticFunding from "../../smart_contract/artifacts/contracts/QuadraticFunding.sol/QuadraticFunding.json";

function CreateProject() {
  const { account, library } = useEthers();

  const [projectName, setProjectName] = useState("");
  const [txHash, setTxHash] = useState("");
  const [emitProject, setEmitProject] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const contractAddress = "0x6081251E41fC8E0153B9125Bd9d7761542d11799";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateProject(); // Call handleCreateProject here
  };

  const handleCreateProject = async () => {
    setIsLoading(true); // Set loading state
    try {
      const signer = library.getSigner(account);
      const contract = new Contract(
        contractAddress,
        quadraticFunding.abi,
        signer
      );

      const tx = await contract.createProject(projectName);
      setTxHash(tx.hash);
      const receipt = await tx.wait(); // Wait for the transaction to be mined

      // Log the entire receipt to understand its structure
      console.log("Transaction receipt:", receipt);

      // Access the emitted event from the receipt
      const emitProject = receipt.events.find(
        (event) => event.event === "ProjectCreated"
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        <h1 className="text-white text-3xl font-bold mb-6">
          Create a New Project
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-80"
        >
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border border-gray-300 p-2 rounded mb-4 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 w-full"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateProject;
