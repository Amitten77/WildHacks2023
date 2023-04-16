import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {AccountId,
    PrivateKey,
    Client,
    Hbar,
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,} from '@hashgraph/sdk'
window.global = window;
import AWS from 'aws-sdk'

function Test() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const operatorId = AccountId.fromString(MY_ACCOUNT_ID);
  const operatorKey = PrivateKey.fromString(MY_PRIVATE_KEY);
  const treasuryId = AccountId.fromString(MY_ACCOUNT_ID);
  const treasuryKey = PrivateKey.fromString(MY_PRIVATE_KEY);
  const accessKeyId = ACCESS_KEY_ID;
  const secretAccessKey = SECRET_ACCESS_KEY;
  const client = Client.forTestnet().setOperator(operatorId, operatorKey);

  const supplyKey = PrivateKey.generate();

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  async function addtoS3(object_name, imagePath) {
    const s3 = new AWS.S3({apiVersion: '2006-03-01', accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});
    const uploadedImage = await s3.upload({
      Bucket: "wildbucket2023",
      Key: object_name,
      Body: imagePath,
      ACL: "public-read",
    }).promise()
    console.log("HI")
    console.log("https://wildbucket2023.s3.amazonaws.com/" + object_name)
    return "https://wildbucket2023.s3.amazonaws.com/" + object_name;
  }

  async function main(tokenName, object_name, imagePath) {
    //Create the NFT
    tokenName = document.getElementById('Token_Name').value
    object_name = document.getElementById('Name').value
    imagePath = document.getElementById("file-upload").files[0]

    //const location = await addtoS3(object_name, imagePath);
    const locationn = "hi"
    const nftCreate = await new TokenCreateTransaction()
      .setTokenName(object_name)
      .setTokenSymbol(tokenName)
      .setTokenMemo("Check out image at: " + locationn)
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
  
    //Log the serial number
    console.log("https://hashscan.io/testnet/token/" + tokenId);
  }



  return (
    <div className="App">
      <header className="App-header">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress}
                  </p>
                </div>
                <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
              </div>
            ) : (
              <h3 HI/>
            )}
            {(
            <>
            <button className="btn" onClick={connectWallet}>Connect</button>
            <input type="text" id="Token_Name" placeholder="Token Name"/>
            <input type="text" id="Name" placeholder="Name"/>
            <input type="file" id="file-upload"/>
            <button className="submit" onClick={main}>Submit</button>
          </>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    </div>
  );
}

export default Test;
