import * as app from 'express';
import blockchain from './src/ledger/blockchain';
import block from './src/ledger/block';
import dbconnect from './src/db_connection';

const blockchain = new blockchain();


app.get('/', (request, response) => res.sendFile(`${__dirname}/index.html`));

app.get('/block/:index', async(req, res) => {
  try{
    let index = await blockchain.getBlockIndex();
    if (index == -1){
      response.status(500);
      response.send('No block found on the chain, to fetch add a block using POST call');
    }
    else{
      let block = await blockchain.getBlock(request.params.height);
      response.status(200);
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(block));
    }
  } catch(error){
    response.status(500);
    response.send(`Error: ${error}`);
  }
});
