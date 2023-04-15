pragma solidity >=0.7.0;

contract accessNFTs {
    // the contract's owner, set in the constructor
    address owner;

    // the message we're storing
    mapping(string => string) public imageMap; //Maps NFT address to S3 bucket
    mapping(string => string) public secretMap; //Maps code_word to NFT address
    mapping(string => string) public promptMap; //Maps NFT address to prompt
    mapping(string => string) public tokenMap; //Maps NFT address to TokenName


    constructor() {
        // set the owner of the contract for `kill()`
        owner = msg.sender;
    }

    function getImage(string memory _addr) public view returns (string memory) {
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.
        return imageMap[_addr];
    }

    function getPrompt(string memory _addr, string memory _code) public view returns (string memory) {
        if (keccak256(abi.encodePacked(_code)) == keccak256(abi.encodePacked(secretMap[_addr]))) {
            return promptMap[_addr];
        }
        return "******";
    }

    function getToken(string memory _addr) public view returns (string memory) {
        return tokenMap[_addr];
    }

    function setNFT(string memory contract_address, string memory image, string memory secret, string memory prompt, string memory token) public {
        imageMap[contract_address] = image;
        secretMap[contract_address] = secret;
        promptMap[contract_address] = prompt;
        tokenMap[contract_address] = token; 
    }

}