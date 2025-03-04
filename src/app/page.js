"use client"; // Mark this component as a Client Component

import { useEffect, useState } from "react"; // Import useEffect and useState
import { ethers } from "ethers";

export default function Home() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false); // State to track Metamask installation

  // Check if Metamask is installed when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      setIsMetamaskInstalled(true);
    }
  }, []);

  const connectWallet = async () => {
    if (!isMetamaskInstalled) {
      console.log("No Metamask wallet installed!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log("Connected address:", address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Demo Metamask Connection</h1>
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </>
  );
}