import React, { useState } from "react";
import { ethers, Contract } from "ethers";
import { useEthers } from "@usedapp/core";
import quadraticFunding from "../../artifacts/contracts/QuadraticFunding.sol/QuadraticFunding.json";

function AllProject() {
  const { account, library } = useEthers();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState("");

  const contractAddress = "0x6081251E41fC8E0153B9125Bd9d7761542d11799";

  const handleViewAllProject = async () => {
    setLoading(true);
    try {
      const signer = library.getSigner(account);
      const contract = new Contract(
        contractAddress,
        quadraticFunding.abi,
        signer
      );

      // Call roundEndTime as a function
      const roundEndTime = await contract.roundEndTime();
      const endTime = roundEndTime.toNumber(); // Convert BigNumber to number
      const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

      // Calculate the remaining time
      const remainingTime = endTime - currentTime;

      if (remainingTime > 0) {
        // Convert remaining time to months, days, hours, minutes, and seconds
        const secondsInMinute = 60;
        const secondsInHour = secondsInMinute * 60;
        const secondsInDay = secondsInHour * 24;
        const secondsInMonth = secondsInDay * 30; // Approximation

        const months = Math.floor(remainingTime / secondsInMonth);
        const days = Math.floor(
          (remainingTime % secondsInMonth) / secondsInDay
        );
        const hours = Math.floor(
          (remainingTime % secondsInDay) / secondsInHour
        );
        const minutes = Math.floor(
          (remainingTime % secondsInHour) / secondsInMinute
        );
        const seconds = remainingTime % secondsInMinute;

        setCountdown(
          `${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
        );
      } else {
        setCountdown("Funding round has ended.");
      }
    } catch (e) {
      console.error("Error fetching round end time:", e);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Funding Round Timer
      </h1>
      <button
        onClick={handleViewAllProject}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Get Round End Time
      </button>
      {loading && <p className="text-gray-600">Loading...</p>}
      {countdown && (
        <p className="text-lg font-semibold text-gray-700">
          Countdown: <span className="text-blue-600">{countdown}</span>
        </p>
      )}
    </div>
  );
}

export default AllProject;
