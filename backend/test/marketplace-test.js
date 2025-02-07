const { expect } = require("chai");

describe("ETNMarketplace", function () {
  let Marketplace, marketplace, owner, seller, buyer;

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();
    Marketplace = await ethers.getContractFactory("ETNMarketplace");
    marketplace = await Marketplace.deploy();
    await marketplace.deployed(); // Ensure contract is fully deployed
  });

  it("should allow sellers to list products", async function () {
    await marketplace.connect(seller).listProduct("Laptop", "A powerful laptop", ethers.parseEther("1"));
    const product = await marketplace.products(1);
    expect(product.name).to.equal("Laptop");
  });

  it("should allow buyers to purchase products", async function () {
    await marketplace.connect(seller).listProduct("Phone", "Latest model", ethers.parseEther("0.5"));
    await marketplace.connect(buyer).purchaseProduct(1, { value: ethers.parseEther("0.5") });
    const product = await marketplace.products(1);
    expect(product.isSold).to.be.true;
  });
});
