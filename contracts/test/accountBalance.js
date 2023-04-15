const {
    AccountId,
    PrivateKey,
    Client,
    AccountBalanceQuery
  } = require("@hashgraph/sdk");
  require("dotenv").config();

const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
//Create the account balance query
async function main() {
    const query = new AccountBalanceQuery()
    .setAccountId(operatorId);

    //Submit the query to a Hedera network
    const accountBalance = await query.execute(client);

    //Print the balance of hbars
    console.log("The hbar account balance for this account is " +accountBalance.hbars); 
}


main()
//v2.0.7