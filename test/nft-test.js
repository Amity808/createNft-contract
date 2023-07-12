const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("MYNFT", function() {
    this.timeout(50000);

    let myNft;
    let owner;
    let acc1;
    let acc2;

    this.beforeEach(async function() {
        const MyNFT = await ethers.getContractFactory("MyNFT");
        [owner, acc1, acc2] = await ethers.getSigners();

        myNft = await MyNFT.deploy()

    
    })
    it("Should set the right owner", async function() {
        expect(await myNft.owner()).to.equal(owner.address);
    })

    it("Should mint one NFT", async function () {
        expect(await myNft.balanceOf(acc1.address)).to.equal(0);

        const tokenURI = "https://example.com/1";
        const tx = await myNft.connect(owner).safeMint(acc1.address, tokenURI)
        await tx.wait()

        expect(await myNft.balanceOf(acc1.address)).to.equal(1)
    })

    it(" Should set the correct tokenURI", async function() {
        const tokenURI_1 = "https://example.com/1"
        const tokenURI_2 = "https://example.com/2"

        const tx1 = await myNft.connect(owner).safeMint(acc1.address, tokenURI_1);
        await tx1.wait();
        const tx2 = await myNft.connect(owner).safeMint(acc2.address, tokenURI_2);
        await tx2.wait();

        expect( await myNft.tokenURI(0)).to.equal(tokenURI_1)
        expect( await myNft.tokenURI(1)).to.equal(tokenURI_2)
    })
    
})
