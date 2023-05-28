var abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "ipfsId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "encrypted_key",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "nonce",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "public_key",
                "type": "string"
            }
        ],
        "name": "approve_buy",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "ipfsId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "publicKey",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "sellerId",
                "type": "address"
            }
        ],
        "name": "sendPublicKey",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "ipfsId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "info",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "encrypted_hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "key_hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "double_hash",
                "type": "string"
            }
        ],
        "name": "add_file",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "name": "allFiles",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "ipfsId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "info",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "encrypted_hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "key_hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "double_hash",
                "type": "string"
            },
            {
                "internalType": "enum Market.fileState",
                "name": "state",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "buyers",
        "outputs": [
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "set",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "create_buyer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "create_seller",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "listOfFiles",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "ipfsId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "info",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "encrypted_hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "key_hash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "double_hash",
                "type": "string"
            },
            {
                "internalType": "enum Market.fileState",
                "name": "state",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numberOfFiles",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "ipfsId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "publicKey",
                "type": "string"
            }
        ],
        "name": "request_buy",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "sellers",
        "outputs": [
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "set",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "ipfsId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "encrypted_key",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "nonce",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "public_key",
                "type": "string"
            }
        ],
        "name": "send_encrypted_key",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    }
]
module.exports = abi