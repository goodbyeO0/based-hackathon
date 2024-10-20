import { useEffect, useState, useRef } from "react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { ethers, Contract } from "ethers";
import { useNavigate } from "react-router-dom";
import quadraticFunding from "../../smart_contract/artifacts/contracts/QuadraticFunding.sol/QuadraticFunding.json";

function Navbar() {
  const { activateBrowserWallet, deactivate, account, library } = useEthers();
  const etherBalance = useEtherBalance(account);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingMatchingPool, setLoadingMatchingPool] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [matchingPool, setMatchingPool] = useState("");
  const timerRef = useRef(null); // Create a ref to store the timer ID

  const contractAddress = "0x8dA1b69c7fc6a7e889Dba825b8E7848d8E48aEA8";

  const connectWallet = () => {
    if (window.ethereum) {
      activateBrowserWallet();
    } else {
      window.location.href =
        "https://metamask.app.link/dapp/based-hackathon.vercel.app/contribute";
    }
  };

  const viewMatchingPool = async () => {
    setLoadingMatchingPool(true);
    try {
      const signer = library.getSigner(account);
      const contract = new Contract(
        contractAddress,
        quadraticFunding.abi,
        signer
      );

      // Call roundEndTime as a function
      const matchingPool = await contract.matchingPool();
      const numMatchingpool = matchingPool.toString(); // Convert BigNumber to number
      setMatchingPool(numMatchingpool);
    } catch (e) {
      console.error("Error fetching round end time:", e);
    } finally {
      setLoadingMatchingPool(false);
    }
  };

  const viewRoundEndTime = async () => {
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
        updateCountdown(remainingTime);
      } else {
        setCountdown("Funding round has ended.");
      }
    } catch (e) {
      console.error("Error fetching round end time:", e);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const updateCountdown = (remainingTime) => {
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30; // Approximation

    const months = Math.floor(remainingTime / secondsInMonth);
    const days = Math.floor((remainingTime % secondsInMonth) / secondsInDay);
    const hours = Math.floor((remainingTime % secondsInDay) / secondsInHour);
    const minutes = Math.floor(
      (remainingTime % secondsInHour) / secondsInMinute
    );
    const seconds = remainingTime % secondsInMinute;

    setCountdown(
      `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    );

    // Clear any existing timer before setting a new one
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Set up a timer to update the countdown every second
    timerRef.current = setInterval(() => {
      remainingTime -= 1; // Decrease remaining time by 1 second
      if (remainingTime <= 0) {
        clearInterval(timerRef.current);
        setCountdown("Funding round has ended.");
      } else {
        updateCountdown(remainingTime); // Update the countdown display
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (account) {
      viewRoundEndTime(); // Call the function when the component mounts or account changes
      viewMatchingPool();
    }

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      clearInterval(timerRef.current);
    };
  }, [account]); // Dependency array includes account to call when it changes

  return (
    <nav className="bg-primary p-4 flex flex-col md:flex-row justify-between items-center">
      {!account ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <span className="text-white mr-4">
            {`Connected: ${account.substring(0, 6)}...${account.substring(
              account.length - 4
            )}`}
          </span>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => deactivate()}
          >
            Disconnect
          </button>
        </>
      )}
      <div className="mb-2 md:mb-0">
        {loading && <p className="text-gray-600">Loading...</p>}
        {countdown && (
          <p className="text-md font-semibold text-white">
            Countdown: <span className="text-accent">{countdown}</span>
          </p>
        )}
      </div>
      <div className="mb-2 md:mb-0">
        {loadingMatchingPool && <p className="text-gray-600">Loading...</p>}
        {matchingPool && (
          <p className="text-md font-semibold text-white">
            MatchingPool:{" "}
            <span className="text-accent">
              {ethers.utils.formatEther(matchingPool)} ETH
            </span>
          </p>
        )}
      </div>
      <div className="wallet-info flex flex-col md:flex-row items-center">
        <button
          className="bg-secondary hover:bg-purple-800 text-white font-bold py-2 px-4 rounded mr-2 mb-2 md:mb-0"
          onClick={() => navigate("/matching-pool")}
        >
          Fund MatchingPool
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 md:mb-0"
          onClick={() => navigate("/contribute")}
        >
          Fund Project
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 md:mb-0"
          onClick={() => navigate("/all-project")}
        >
          All Projects
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
