/**
 * Deployment script for WalletVerification contract
 * Run: npx hardhat run scripts/deploy.js --network polygonAmoy
 */

const hre = require("hardhat");

async function main() {
  console.log(" Deploying WalletVerification contract to Polygon Amoy...");

  // Get the contract factory
  const WalletVerification = await hre.ethers.getContractFactory("WalletVerification");
  
  // Deploy the contract
  const walletVerification = await WalletVerification.deploy();
  
  await walletVerification.waitForDeployment();
  
  const contractAddress = await walletVerification.getAddress();

  console.log("✅ WalletVerification deployed to:", contractAddress);
  console.log("\n📝 Update your .env file with:");
  console.log(`CONTRACT_ADDRESS=${contractAddress}`);
  
  // Verify contract on PolygonScan (optional)
  console.log("\n⏳ Waiting for block confirmations...");
  await walletVerification.deploymentTransaction().wait(5);
  
  console.log("\n✅ Deployment complete!");
  console.log("You can verify the contract on PolygonScan Amoy:");
  console.log(`https://amoy.polygonscan.com/address/${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



