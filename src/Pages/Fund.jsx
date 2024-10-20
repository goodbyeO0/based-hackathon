import React, { useState, useEffect } from "react"; // Import useEffect
import { ethers, Contract, utils } from "ethers";
import { useEthers } from "@usedapp/core";
import { useLocation } from "react-router-dom"; // Import useLocation
import quadraticFunding from "../../artifacts/contracts/QuadraticFunding.sol/QuadraticFunding.json";

function Fund() {
  const { account, library } = useEthers();
  const location = useLocation(); // Initialize useLocation
  const donationAmount =
    new URLSearchParams(location.search).get("donationAmount") || 0; // Get donation amount from URL parameters

  const [emitFund, setEmitFund] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPay, setIsPay] = useState(false);

  const contractAddress = "0x6081251E41fC8E0153B9125Bd9d7761542d11799";

  const handlePayFund = async () => {
    if (!library) {
      alert("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    try {
      const signer = library.getSigner(account);
      const contract = new Contract(
        contractAddress,
        quadraticFunding.abi,
        signer
      );

      const tx = await contract.contribute(1, {
        value: utils.parseEther(donationAmount.toString()), // Use the donation amount
      });
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);

      const emitFund = receipt.events.find(
        (event) => event.event === "ContributionMade"
      );

      if (emitFund) {
        console.log(`emit createFundEvent : ${emitFund.args}`);
        setEmitFund(emitFund.args);
      } else {
        console.log("FundCreated event not found in receipt");
      }
      alert("Fund created successfully!");
    } catch (error) {
      console.error("Error creating Fund:", error);
    } finally {
      setLoading(false); // Reset loading state
      setIsPay(true);
    }
  };

  // Automatically run handlePayFund when the component mounts
  useEffect(() => {
    if (library && account) {
      handlePayFund();
    }
  }, [library, account]); // Run when library or account changes

  return (
    <div className="flex justify-center w-screen flex-col items-center">
      <div className="text-6xl font-bold text-white rounded-xl p-4 m-4">
        <h1>PAY2FUND</h1>
      </div>
      <button
        onClick={handlePayFund}
        className="text-white bg-secondary p-3 rounded-lg"
      >
        {loading ? "PAYING..." : isPay ? "PAID" : "PAY NOW"}
      </button>
    </div>
  );
}

export default Fund;
