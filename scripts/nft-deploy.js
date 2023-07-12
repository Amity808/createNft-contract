const hre = require("hardhat")


async function main() {

    const [ deployer ] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address)

    const MyNFT = await hre.ethers.deployContract("MyNFT");


    console.log("NFT Address:", await MyNFT.getAddress())
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1)
})