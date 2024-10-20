import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import QRCode from "react-qr-code";

const ContributeButton = () => {
  const [donations, setDonations] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [auraColor, setAuraColor] = useState("bg-yellow-400"); // Default aura color
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState(""); // State to hold QR code value
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDonate = () => {
    setDonations((prev) => prev + 1);
    setIsAnimating(true);
    setShowAlert(true);
    setAuraColor(getRandomColor()); // Change aura color on click
  };

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleFundNow = () => {
    const donationAmount = (donations * 0.0001).toFixed(18); // Limit to 18 decimal places
    const endpoint = `https://based-hackathon.vercel.app/fund?donationAmount=${donationAmount}`;
    setQrCodeValue(endpoint); // Set the QR code value
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsInput(true);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      {qrCodeValue ? ( // Check if QR code value is set
        <div className="h-screen w-screen  flex items-center flex-col justify-center">
          <QRCode value={qrCodeValue} className="m-8" />
          <button
            onClick={() => setQrCodeValue("")} // Clear QR code
            className="bg-red-500 text-white p-2 rounded mt-4"
          >
            Go back
          </button>
        </div>
      ) : isInput ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <button
            onClick={handleDonate}
            className={`relative w-64 h-64 rounded-full bg-secondary text-white text-4xl font-bold
            shadow-lg transition-all duration-300 ease-in-out
            ${
              isAnimating
                ? "scale-95 bg-blue-600"
                : "scale-100 hover:bg-blue-400"
            }
                `}
          >
            <span className="relative z-10">
              {(donations * 0.0001).toFixed(4)} ETH
            </span>
            <div
              className={`absolute inset-0 ${auraColor} rounded-full opacity-0 transition-opacity duration-300
            ${isAnimating ? "animate-ping opacity-75" : ""}
            `}
            ></div>
          </button>
          <button
            onClick={handleFundNow} // Update onClick to handleFundNow
            className="bg-accent p-3 rounded-lg m-4"
          >
            FUND NOW
          </button>
        </div>
      ) : (
        <div className="m-5">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Project ID"
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded ml-2"
            >
              submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ContributeButton;
