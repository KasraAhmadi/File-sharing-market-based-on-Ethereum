
var Web3 = require('web3')
var abi = require('./abi-helper');
// var IPFS = require('ipfs-core');
let sellerAccount;
let buyerAccount;
let contract;

async function pre_smart_contract() {
    web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:5545"));
    accounts = await web3.eth.getAccounts();
    sellerAccount = accounts[0];
    buyerAccount = accounts[1];
    contract = await new web3.eth.Contract(abi, "0x013f62c2366FaA55836a78827aB41B9Fd1A88C72", {
        gas: 1000000000
    });
    // let ipfs = await IPFS.create()

    return { sellerAccount, buyerAccount, contract }
}

module.exports = pre_smart_contract

