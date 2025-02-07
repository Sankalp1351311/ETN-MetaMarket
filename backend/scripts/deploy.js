const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const ETNMarketplace = await hre.ethers.getContractFactory("ETNMarketplace");

    // Deploy the contract
    const etnMarketplace = await ETNMarketplace.deploy();

    // Wait for deployment to complete
    await etnMarketplace.waitForDeployment(); // ✅ Correct method

    // Get deployed contract address
    console.log(`Contract deployed to: ${etnMarketplace.target}`); // ✅ Updated to get the correct address
}

// Run the script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });