/**
 * Hardhat Configuration for deploying to Polygon Amoy Testnet
 * Install: npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
 */

require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: '../.env' });

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    polygonAmoy: {
      url: process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 80002
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};


