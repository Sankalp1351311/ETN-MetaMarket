 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ECommerceETN {
    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    function addProduct(string memory _name, uint _price) public {
        productCount++;
        products[productCount] = Product(productCount, _name, _price, msg.sender);
    }
}
