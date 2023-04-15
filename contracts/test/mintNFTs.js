require("dotenv").config();
const {
  AccountId,
  PrivateKey,
  Client,
  Hbar,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  TokenMintTransaction,
} = require("@hashgraph/sdk");
var AWS = require('aws-sdk');
var fs = require('fs');


const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const treasuryId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const treasuryKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const supplyKey = PrivateKey.generate();

async function addtoS3(object_name, imagePath) {
    s3 = new AWS.S3({apiVersion: '2006-03-01', accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});
    const blob = fs.readFileSync(imagePath)
    const uploadedImage = await s3.upload({
      Bucket: "ameat777",
      Key: object_name,
      Body: blob,
      ACL: "public-read",
    }).promise()
    console.log("HI")
    console.log("https://ameat777.s3.amazonaws.com/" + object_name)
    return "https://ameat777.s3.amazonaws.com/" + object_name;
  }

async function main(tokenName, object_name, imagePath) {
    //Create the NFT
    const location = await addtoS3(object_name, imagePath);
    const nftCreate = await new TokenCreateTransaction()
      .setTokenName(object_name)
      .setTokenSymbol(tokenName)
      .setTokenMemo("Check out image at: " + location)
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(treasuryId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(250)
      .setSupplyKey(supplyKey)
      .freezeWith(client);
  
    //Sign the transaction with the treasury key
    const nftCreateTxSign = await nftCreate.sign(treasuryKey);
  
    //Submit the transaction to a Hedera network
    const nftCreateSubmit = await nftCreateTxSign.execute(client);
  
    //Get the transaction receipt
    const nftCreateRx = await nftCreateSubmit.getReceipt(client);
  
    //Get the token ID
    const tokenId = nftCreateRx.tokenId;
  
    //Log the token ID
    console.log(`- Created NFT with Token ID: ${tokenId} \n`);
  
    // Max transaction fee as a constant
    const maxTransactionFee = new Hbar(20);
  
    //IPFS content identifiers for which we will create a NFT
    const CID = [
      Buffer.from(
        "ipfs://bafyreiao6ajgsfji6qsgbqwdtjdu5gmul7tv2v3pd6kjgcw5o65b2ogst4/metadata.json"
      ),
      Buffer.from(
        "ipfs://bafyreic463uarchq4mlufp7pvfkfut7zeqsqmn3b2x3jjxwcjqx6b5pk7q/metadata.json"
      ),
      Buffer.from(
        "ipfs://bafyreihhja55q6h2rijscl3gra7a3ntiroyglz45z5wlyxdzs6kjh2dinu/metadata.json"
      ),
      Buffer.from(
        "ipfs://bafyreidb23oehkttjbff3gdi4vz7mjijcxjyxadwg32pngod4huozcwphu/metadata.json"
      ),
      Buffer.from(
        "ipfs://bafyreie7ftl6erd5etz5gscfwfiwjmht3b52cevdrf7hjwxx5ddns7zneu/metadata.json"
      ),
    ];
  
    // MINT NEW BATCH OF NFTs
    const mintTx = new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata(CID) //Batch minting - UP TO 10 NFTs in single tx
      .setMaxTransactionFee(maxTransactionFee)
      .freezeWith(client);
  
    //Sign the transaction with the supply key
    const mintTxSign = await mintTx.sign(supplyKey);
  
    //Submit the transaction to a Hedera network
    const mintTxSubmit = await mintTxSign.execute(client);
  
    //Get the transaction receipt
    const mintRx = await mintTxSubmit.getReceipt(client);
  
    //Log the serial number
    console.log(
      `- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`
    );
  
    //Log the serial number
    console.log(
      `- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`
    );
    return;
  }


  main("SWATHITKN", "Swathi", "../images/WildLogo.png");