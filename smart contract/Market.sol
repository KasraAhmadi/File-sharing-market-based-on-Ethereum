
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Market {

    uint8 public numberOfFiles;
    uint public symSignId;
    uint public assymSignId;
    address owner;

    
   enum fileState{ verified, notVerified, free }

    struct File {
        address owner;        
        string  ipfsId;
        uint price;
        string title;
        string info;
        string hash;
        string encrypted_hash;
        string key_hash;
        string double_hash;
        fileState state;
    }
    
    struct Sign {
        uint symSignId;
        uint assymSignId;
        string key_hash;
        string file_hash;
        string public_key;
    }
    
    struct Seller {
        File[] files;
        string email;
        string name;
        bool set;
    }

    struct Buyer {
        File[] files;
        string email;
        string name;
        bool set;
    }

    
    mapping(address => Seller) public sellers;
    mapping(address => Buyer) public buyers;
    mapping(string => File) public listOfFiles;
    mapping(string => Sign) public listOfSign;
    mapping(uint8 => File) public allFiles;
    // mapping(uint8 => Buyer) public listOfBuyers;
    // mapping(uint8 => Seller) public listOfSeller;


    

    constructor () public{
        owner = msg.sender;

    }
    
    event approve_buy (
        string ipfsId,
        string encrypted_key,
        string nonce,
        string public_key
        );

    event sendPublicKey (
        string ipfsId,
        string publicKey,
        address sellerId
        );
        

    function stringToBytes32 (string memory source) private returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
    
    
    function create_seller( string memory email,string memory name) public {
        Seller storage user = sellers[msg.sender];
        // Check that the user did not already exist:
        require(!user.set);
        user.email = email;
        user.name = name;
        user.set = true;
}

    function create_buyer( string memory email,string memory name) public {
        Buyer storage user = buyers[msg.sender];
        // Check that the user did not already exist:
        require(!user.set);
        user.email = email;
        user.name = name;
        user.set = true;
}


    // function getName() public view returns (string memory)
    // {
    //     return name;
    // }

    function add_file(uint price,string memory ipfsId,string memory info,string  memory title,string  memory hash,string  memory encrypted_hash,string memory key_hash,string memory double_hash) public payable   {
        File memory myFile;
        myFile.price = price;
        myFile.owner = msg.sender;
        myFile.ipfsId = ipfsId;
        myFile.info = info;
        myFile.title = title;
        myFile.state = fileState.free;
        myFile.hash = hash;
        myFile.encrypted_hash = encrypted_hash;
        myFile.key_hash = key_hash;
        myFile.double_hash = double_hash;
        listOfFiles[ipfsId] = myFile;
        Sign memory mySign;
        listOfSign[ipfsId] = mySign;
        sellers[msg.sender].files.push(myFile);
        allFiles[numberOfFiles] = myFile;
        numberOfFiles += 1;
    }
    
    
    function request_buy(string memory ipfsId,string memory publicKey) public payable returns(bool success){
        if(listOfFiles[ipfsId].state == fileState.free){
            require(address(msg.sender).balance >= listOfFiles[ipfsId].price,"You have no money" );
            require(msg.value == listOfFiles[ipfsId].price,"Price is not equal");
            payable(owner).transfer(msg.value);
            buyers[msg.sender].files.push(listOfFiles[ipfsId]);
            emit sendPublicKey(ipfsId,publicKey,listOfFiles[ipfsId].owner);
            return true;
        }else{
           revert("File not found");
        }
    }
    
    function symmetric_sign_key(string memory ipfsId,string memory file_hash,string memory key_hash) public payable returns(uint key){
        symSignId = symSignId + 1;
        listOfSign[ipfsId].key_hash = key_hash;
        listOfSign[ipfsId].file_hash = file_hash;
        listOfSign[ipfsId].symSignId = symSignId;
        return symSignId;
    }
    
    function assymmetric_sign_key(string memory ipfsId,string memory public_key,string memory key_hash) public payable returns(uint key){
        assymSignId = assymSignId + 1;
        listOfSign[ipfsId].public_key = public_key;
        listOfSign[ipfsId].assymSignId = assymSignId; 
        return assymSignId;
    }
    
    
    function send_encrypted_key(string memory ipfsId,string memory encrypted_key,string memory nonce,string memory public_key) public payable returns(bool success){
           emit approve_buy(ipfsId,encrypted_key,nonce,public_key);
    }


}