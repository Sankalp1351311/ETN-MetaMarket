// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ETNMarketplace {
    address public owner;

    struct Product {
        uint id;
        address payable seller;
        string name;
        string description;
        uint price;
        bool isSold;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    event ProductListed(uint id, address seller, string name, uint price);
    event ProductPurchased(uint id, address buyer, uint price);

    constructor() {
        owner = msg.sender;
    }

    function listProduct(string memory _name, string memory _description, uint _price) public {
        require(_price > 0, "Price must be greater than zero");

        productCount++;
        products[productCount] = Product(productCount, payable(msg.sender), _name, _description, _price, false);

        emit ProductListed(productCount, msg.sender, _name, _price);
    }

    function purchaseProduct(uint _id) public payable {
        Product storage product = products[_id];

        require(product.id > 0 && product.id <= productCount, "Invalid product ID");
        require(msg.value == product.price, "Incorrect price sent");
        require(!product.isSold, "Product already sold");

        product.seller.transfer(msg.value);
        product.isSold = true;

        emit ProductPurchased(_id, msg.sender, product.price);
    }
}