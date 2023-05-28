const { create } = require('ipfs-http-client')
const asy_crypto = require('asymmetric-crypto')
const crypto = require("crypto")
const client = create()

const helper = {


    async hash(utf8String) {
        hasher = crypto.createHash('sha512')
        hasher.update(utf8String, 'utf8')
        hexString = hasher.digest('hex')
        return hexString
    },
    async symetric_encrypt(utf8String, key) {
        cipher = crypto.createCipher('aes-256-cbc', key)
        encryptedData = cipher.update(utf8String, 'utf8', 'hex')
        encryptedData += cipher.final('hex')
        return encryptedData
    },

    async symetric_decrypt(hexString, key) {
        decipher = crypto.createDecipher('aes-256-cbc', key)
        decryptedData = decipher.update(hexString, 'hex', 'utf8')
        decryptedData += decipher.final('utf8')
        return decryptedData
    },
    async upload_ipfs(obj) {

        const { cid } = await client.add(obj)
        console.log(`### Uploaded with cid: '${cid}' `)
        return cid
    },
    async download_ipfs(cid) {
        console.log("Download started")
        let data = ''
        for await (const chunk of client.cat(cid)) {
            data += chunk.toString()
        }
        // console.log(`### Downloaded data: '${data}' `)
        return data;
    },

    create_key_pair() {
        const key = asy_crypto.keyPair()
        return { "public": key.publicKey, "private": key.secretKey };
    }

}

module.exports = helper;
