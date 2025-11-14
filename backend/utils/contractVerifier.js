/**
 * Smart Contract Verifier
 * Interacts with Polygon Amoy smart contract to verify wallet hashes
 */

const { ethers } = require('ethers');

// Smart Contract ABI - only includes the functions we need
const CONTRACT_ABI = [
  "function getHash(address walletAddress) view returns (string)",
  "function setHash(address walletAddress, string ipfsHash) public",
  "event HashStored(address indexed walletAddress, string ipfsHash)"
];

/**
 * Verify wallet by fetching hash from smart contract
 * @param {string} walletAddress - Ethereum wallet address
 * @returns {string|null} IPFS hash from contract or null if not found
 */
async function verifyWalletWithContract(walletAddress) {
  try {
    // Connect to Polygon Amoy RPC
    const provider = new ethers.JsonRpcProvider(process.env.POLYGON_AMOY_RPC_URL);

    // Get contract address from environment
    const contractAddress = process.env.CONTRACT_ADDRESS;

    if (!contractAddress || contractAddress === '0x...') {
      throw new Error('Contract address not configured. Please deploy contract and update CONTRACT_ADDRESS in .env');
    }

    // Create contract instance
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);

    // Call getHash function
    const hash = await contract.getHash(walletAddress);

    // If hash is empty string, wallet not registered in contract
    if (!hash || hash === '') {
      return null;
    }

    return hash;

  } catch (error) {
    console.error('Error fetching hash from contract:', error);
    throw new Error(`Failed to verify with contract: ${error.message}`);
  }
}

module.exports = {
  verifyWalletWithContract
};



