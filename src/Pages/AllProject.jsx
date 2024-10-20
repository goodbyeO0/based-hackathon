import React, { useState } from "react";
import { ethers, Contract } from "ethers";
import { useEthers } from "@usedapp/core";
import quadraticFunding from "../../artifacts/contracts/QuadraticFunding.sol/QuadraticFunding.json";

function AllProject() {
  const { account, library } = useEthers();
  const [allProjectData, setAllProjectData] = useState([]);

  const totalProject = async () => {
    const contractAddress = "0x6081251E41fC8E0153B9125Bd9d7761542d11799";
    const signer = library.getSigner(account);
    const contract = new Contract(
      contractAddress,
      quadraticFunding.abi,
      signer
    );
    const projectCount = await contract.projectCount();
    return projectCount.toNumber(); // Return the project count
  };

  const fetchAllProjects = async () => {
    const contractAddress = "0x6081251E41fC8E0153B9125Bd9d7761542d11799";
    const signer = library.getSigner(account);
    const contract = new Contract(
      contractAddress,
      quadraticFunding.abi,
      signer
    );
    const numProjects = await totalProject(); // Await the result of totalProject
    const projects = []; // Create an array to hold project data

    for (let i = 1; i <= numProjects; i++) {
      const projectData = await contract.getProjectDetails(i);
      projects.push(projectData); // Push project data to the array
    }

    setAllProjectData(projects); // Update state with the array of projects
    console.log(projects); // Log the projects array
  };

  return (
    <div className="container mx-auto p-4 bg-background h-screen w-screen">
      <h1 className="text-2xl font-bold text-center text-text mb-6">
        All Projects
      </h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={fetchAllProjects}
          className="bg-secondary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Fetch Projects
        </button>
      </div>
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-primary text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Project Name</th>
              <th className="py-3 px-6 text-left">Project Owner</th>
              <th className="py-3 px-6 text-left">Total Contributions (ETH)</th>
              <th className="py-3 px-6 text-left">Contributors Count</th>
              <th className="py-3 px-6 text-left">Matching Amount (ETH)</th>
              <th className="py-3 px-6 text-left">Total Fund After QF (ETH)</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md ">
            {allProjectData.map((project, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{project.name}</td>
                <td className="py-3 px-6">
                  {`${project.owner.substring(
                    0,
                    6
                  )}...${project.owner.substring(project.owner.length - 4)}`}
                </td>
                <td className="py-3 px-6">
                  {ethers.utils.formatEther(project.totalContributions)} ETH
                </td>
                <td className="py-3 px-6">
                  {project.contributorsCount.toString()}
                </td>
                <td className="py-3 px-6">
                  {ethers.utils.formatEther(project.matchingAmount)} ETH
                </td>
                <td className="py-3 px-6">
                  {ethers.utils.formatEther(project.totalAmount)} ETH
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProject;
