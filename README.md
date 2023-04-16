# WildPrompts x WildHacks2023

Welcome to our Project, WildPrompts! In this README, we'll be describing both what this project is and how we did it. 



## What is our project and why should you care?

Our project serves as a hub for artists to buy NFTs using a smart contract, classifies the image that an artist inputs, and generates a prompt if an artist needs ideas for their art. Artists can view their profile for the NFTs they purchased and their withstanding balance, thus essentially having our project be an open market in the digital transformation of art. Mostly importantly, WildPrompts is a platform for users to sell the prompts associated with their NFTs, because as WIRED cited, the art of prompting is just as important as the art. Good prompts can be used to generate other strong art.

This idea came to fruition through a WIRED article, Where the AI Art Boom Came From—and Where It’s Going, which discussed the automation of creative work since 2014 to now. Last year especially had a boom in algorithmic generation for illustrations, art, and photo-real scenes, with an example being TikTok's text-to-image generation that users can make custom greenscreens with. Although this generator pales in comparison to advanced generators such as Midjourney or OpenAI's DALL-E, TikTok's feature lead to an explosion in popularity of AI generated art as it was not limited in terms of who can use it's software compared to said advanced generators.

Thus as avid artists ourselves, we wanted to create a platform for everyday artists who wanted an easy and acccessible way to sell their NFTs so there are no limits on one's artistic vision.

The future of art is here :).


## How did we utilize Blockchain, Machine Learning, Cloud Computing, and Graphic Design technologies to make this project work

Here's a flowchart highlighting the architecture of our project:


I will now run through and explain some of our code(take a look in our contracts folder for reference, this is where we tested and verified our implementations of our different APIs):

### Blockchain

#### 1. Our Smart contract, (accessNFTs.sol)

In this smart contract, the user can use an NFT's address to access information about the NFT through the contract, and if it's their NFT, the user can access the secret prompt too. 

```
function getPrompt(string memory _addr, string memory _code) public view returns (string memory) {
        if (keccak256(abi.encodePacked(_code)) == keccak256(abi.encodePacked(secretMap[_addr]))) {
            return promptMap[_addr];
        }
        return "******";
    }
```

In /deploy/deployAccessNFTs.js, we use our contracts bytecode that we got from compiling it on Remix IDE to deploy it to Hedera's Test Network (Check out our contract: id: 0.0.4153069, https://hashscan.io/testnet/contract/0.0.4153069)

#### 2.Minting NFTs, (./test/mintNFTs.js)

Probably the most important part of our code, in this block we Mint our NFT and output the string of it's link to our user:

```
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
```

#### 3.Getting Account Balance (./test/AccountBalance.js)

Get's the account balance of the user, so that they know whether they can afford an NFT on the marketplace

```
async function main() {
    const query = new AccountBalanceQuery()
    .setAccountId(operatorId);

    //Submit the query to a Hedera network
    const accountBalance = await query.execute(client);

    //Print the balance of hbars
    console.log("The hbar account balance for this account is " +accountBalance.hbars); 
}
```

#### 4.Sending and Recieving Hbar (./test/sendAndRecieve.js)

This function is ran when an user wants to buy an NFT :) 

```
async function transfer(sender, reciever) {
    // Create a transaction to transfer 100 hbars
    const transaction = new TransferTransaction()
        .addHbarTransfer(sender, new Hbar(-100))
        .addHbarTransfer(reciever, new Hbar(100));
        
    //Submit the transaction to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " +transactionStatus.toString());
}
```

### Machine Learning

#### 1. Our Image Classifier (developed/tested in frontend)

Here, we used Tensorflow's Common Object detection model on our image to classify the image that our user inputs

```
const cocoSsd = require('@tensorflow-models/coco-ssd');
require('@tensorflow/tfjs-core'); /* or @tensorflow/tfjs-node */
require('@tensorflow/tfjs-backend-cpu');
const tf = require('@tensorflow/tfjs-node');`

async function getImage() {
    const model = await cocoSsd.load();

    // Classify the image.
    const predictions = await model.detect(tf.node.decodeJpeg(img));

    console.log('Predictions: ');
    if (predictions.length > 0) {
        return predictions[0]["class"]
    }
    return "None";
}
```

#### 2. Our Prompt Generator (developed/tested in frontend)

We take in the user's input and generate a new word with it. If input was empty, we generate a random word. If not empty, we use Natural Language Processing to find a synonym for the word. If an image was added, we'll take that as an input. Here's an example for one word.

```
if (noun1 == "") {
        noun1 = getRandomItem(cartoon_characters)
    } else {
        if ((synonyms(noun1, "n") === undefined) == false) {
            noun1 = getRandomItem(synonyms(noun1, "n"))
        }
    }
    if (document.getElementById('file-upload').files.length > 0) {
      noun1 = await getImage();
    }
```


### Cloud Computing

#### 1. Deployment and Storage on S3 buckets (./test/mintNFTs.js)

So before the NFT is minted, we want to be able to store it on S3 and get the link. Here is the code that deploys the image onto the S3 bucket and returns the link to it for our NFT(ameat777 is the S3 bucket that stores our data :) ):

```
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
```

## Steps for installation and usage

`git clone https://github.com/Amitten77/WildHacks2023.git`

`cd WildHacks2023`

`cd frontend`

`npm install`

As a last step, you need to create a hidden.jsx file that will store all your global variables for using Blockchain and AWS services

`touch hidden.jsx`

In hidden.jsx, fill out the following information, should be included

```
MY_ACCOUNT_ID=<Hedera Testnet Account-ID>
MY_PRIVATE_KEY=<Hedera Testnet Private-Key>
ACCESS_KEY_ID=<AWS Access Key>
SECRET_ACCESS_KEY=<AWS Secret Access Key>
```

Now you can run 
`npm run dev`

Enjoy WildPrompts!
