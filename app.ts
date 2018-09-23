import * as express from 'express';
import * as bodyParser from 'body-parser';
import blockchain from './src/ledger/blockchain';
import block from './src/ledger/block';
import dbconnect from './src/database/db_connection';

const app = express();

app.use(bodyParser.json());
const router = express.Router();

const blockchainObj = new blockchain();


app.get('/blockchain', (request, response) => {

  let index = blockchainObj.getBlockIndex();
  if(index == -1){
    response.status(500);
    response.send('No block found on the chain, to fetch add a block using post call');
  }
  else{
    const lastBlock = blockchainObj.lastBlock;
    blockchainObj.newTransaction('0', 'id', 1);
    const blockObj = blockchainObj.addBlock(obj);
    response.status(200);
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(block));
  }
});

app.post('/blockchain/transaction/new', (request, response) => {

  if (!(request.body.from && request.body.to && request.body.amount)) {
    response.status(400);
    response.send('Values not available');
  }
  else{
    const index = blockchainObj.newTransaction(request.body.from, request.body.to,
                                          request.body.amount);
    response.send(200);
    response.setHeader('Content-Type', 'application/json');
    response.send(`Transaction added to ${ index } block`);
  }
});

app.get('/blockchain/info', (request, response) => {
  response.status(200);
  response.setHeader('Content-Type', 'application/json');
  response.send({
    blockchain: blockchainObj.chain,
    blockchainLength: blockchainObj.chain.length,
  });
});

app.listen(port_value);
console.log('Blockchain server running on' + port_value);
