const {Client, TransferTransaction} = require("@hashgraph/sdk");
require("dotenv").config('./.env');


const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

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
transfer()



//v2.0.0