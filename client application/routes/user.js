var express = require("express");
var router = express.Router();
var helper = require('../helpers/helper');
const asy_crypto = require('asymmetric-crypto')
var pre_smart_contract = require('../helpers/contract_connection');
var fs = require('fs')
// IPFS = require('ipfs-core')



let sellerAccount;
let buyerAccount;
let contract;
// let ipfs;

let seller_key = helper.create_key_pair();
let buyer_key = helper.create_key_pair();
let key = "IAmTheKey"


pre_smart_contract().then(async obj => {
    contract = obj.contract;
    sellerAccount = obj.sellerAccount;
    buyerAccount = obj.buyerAccount;
    // ipfs = obj.ipfs;
    console.log("Seller account is : " + sellerAccount)
    console.log("Buyer account is : " + buyerAccount)
    // change itbuyer_key = await helper.create_buyer_pub();

    contract.events.sendPublicKey({
        fromBlock: 'latest',
        toBlock: 'pending'

    }, async function (error, event) {
        if (event.returnValues.sellerId == sellerAccount) {
            // Seller part
            console.log("Some one pay for the product")
            const encrypted_key = await asy_crypto.encrypt(key, buyer_key["public"], seller_key["private"])
            console.log(encrypted_key)
            contract.methods.send_encrypted_key(event.returnValues.ipfsId + "", encrypted_key.data, encrypted_key.nonce, buyer_key["public"]).send({ from: sellerAccount }, async function (error, result) {
                if (error) {
                    console.log(error)
                }
            });

        }
    })



    contract.events.approve_buy({
        fromBlock: 'latest',
        toBlock: 'pending'

    }, async function (error, event) {
        console.log(event.returnValues)
        if (event.returnValues.public_key == buyer_key["public"]) {
            // Buyer part
            console.log(event.returnValues.ipfsId)
            let encrypted_data = await helper.download_ipfs(event.returnValues.ipfsId);
            encrypted_data = encrypted_data.substring(1, encrypted_data.length - 1);
            const decrypted_key = asy_crypto.decrypt(event.returnValues.encrypted_key, event.returnValues.nonce, seller_key["public"], buyer_key["private"])
            decrypted = await helper.symetric_decrypt(encrypted_data + "", decrypted_key)
            console.log("Data is: ")
            console.log(decrypted)
            //video save
            // decryptData = decryptData.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
            // decryptData = decryptData.replace(/ /g, '+'); // <--- this is important
            // console.log(buyer_key["public"])
            // fs.writeFile('/Users/kasraahmadi/Documents/Codes/in_progress/proxy_re_server/files/' + buyer_key["public"] + ".mp4", decryptData, 'base64', function (err) {
            //     console.log(err);
            // });
        }
    })
})




router.get("/create_seller", (req, res) => {
    contract.methods.create_seller(req.query.name, req.query.email).send({ from: sellerAccount }, async function (error, result) {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    });
});
router.get("/create_buyer", (req, res) => {
    contract.methods.create_buyer(req.query.name, req.query.email).send({ from: buyerAccount }, async function (error, result) {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    });
});
router.get("/add_file", async (req, res) => {

    //Text Upload
    let data = "Hello world!!!"
    let obj = await helper.symetric_encrypt(data, key)

    //Video 1MB video Upload
    // var filename = "/Users/kasraahmadi/Documents/Codes/in_progress/proxy_re_server/files/upload/1MB.mp4"
    // var binaryData = fs.readFileSync(filename);
    // var base64String = new Buffer(binaryData).toString("base64");
    // let obj = helper.symetric_encrypt(base64String, key)
    let hash_file = await helper.hash(data);
    let encrypted_hash = await helper.hash(obj)
    let key_hash = await helper.hash(key)
    let double_hash = await helper.hash(hash_file + key_hash)
    let file_star = await helper.symetric_encrypt(hash_file, key_hash)
    obj = JSON.stringify(obj);
    ipfs_id = await helper.upload_ipfs(obj);
    contract.methods.add_file(req.query.price, ipfs_id + "", req.query.info, req.query.title, hash_file + "", encrypted_hash + "", key_hash + "", double_hash + "").send({ from: sellerAccount }, async function (error, result) {
        if (error) {
            res.send(error)
        } else {
            res.send(ipfs_id + "")
        }
    });
});
router.get("/request_buy", async (req, res) => {
    contract.methods.request_buy(req.query.ipfs_id, buyer_key["public"]).send({ from: buyerAccount, value: req.query.price }, async function (error, result) {
        if (error) {
            res.send(error)
        } else {
            console.log(result)
            res.send("You buy the product :))")
        }
    });
});






module.exports = router;