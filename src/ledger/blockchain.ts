import block from './block';
import transaction from './transaction';
import blockchainNode from './blockchainnode';
import genesisBlock from './genesisblock';
import axios, { AxiosResponse } from 'axios';
import sha256 from 'crypto-js/sha256';

class blockchain{
  chain: Array<block>;
  currentTransactions: Array<transaction>;
  nodes: Set<string>;
  processingGenesis: boolean;

  constructor(){
    this.chain = [];
    this.currentTransactions = [];
    this.nodes = new Set();
    this.processingGenesis = false;
  }

  getBlock(index: number): block{
    return this.chain[index];
  }

  get lastBlock(){
    return this.chain[Math.max(0, this.chain.length - 1)];
  }

  async maxIndex(){
    return this.chain.dataNumber();
  }

  addNode(address: string): void{
    blockchainNodeObj: blockchainNode;
    const blockchainNodeObj = new blockchainNode(address);
    this.nodes.add(blockchainNodeObj.hostAddress);
  }

  async addBlock(newBlock: block): Promise<block>{
    blockObj: block;

    let blockObj;
    let currentIndex = await this.maxIndex();

    if(currentIndex == -1 && !this.processingGenesis){
      this.processingGenesis = true;
      blockObj = new block('Genesis block');
      currentIndex = await this.maxIndex();
      this.currentTransactions = [];
      this.chain.push(blockObj);
      this.processingGenesis = false;
    }

    if(currentIndex == -1){
      newBlock.index = 0;
    }
    else{
      newBlock.index = currentIndex + 1;
    }

    if (newBlock.index > 0) {
      let previousBlock = this.getBlock(newBlock.index - 1);
      newBlock.previousHash = previousBlock.hash;
    }

    newBlock.hash = blockchain.createSHA256(newBlock).toString();

    return newBlock;
  }

  newTransaction(from: string, to: string, amount: number): number {
    transactionObj: transaction;
    const transactionObj = new transaction(from, to, amount);

    this.currentTransactions.push(transactionObj);

    return this.maxIndex.index + 1;
  }

  static createSHA256(blockObj: block): string {
    return sha256
      .createHash('sha256')
      .update(JSON.stringify(blockObj))
      .digest('hex');
  }

  async validateBlock(index: number): Promise<boolean> {
    let blockObj = this.getBlock(index);
    let blockObjHash = blockObj.hash;

    blockObj.hash = '';

    let validBlockObjHash = blockchain.createSHA256(blockObj).toString();

    if(blockObjHash == validBlockObjHash){
      return true;
    }

    return false;
  }

  async validateChain(chain: Array<block>) : Promise<boolean> {
    let lastBlock = chain[0];
    let currentIndex = 1;

    while(currentIndex < chain.length){
      const blockObj = chain[currentIndex];

      console.log('lastBlock:' + lastBlock);
      console.log('block:' + blockObj);

      if(blockObj.previousHash !== blockchain.createSHA256(lastBlock)){
        return false;
      }

      lastBlock = blockObj;
      currentIndex += 1;

      return true;
    }
  }

  async replaceLargest(): Promise<boolean> {
    const neighbours = this.nodes;
    let maxLength = this.chain.length;
    let newChain = undefined;

    for(const node of neighbours){
      const response : AxiosResponse = await axios(`http://${ node }/chain`);
      if(response.status === 200){
        const length = response.data.length;
        const chain = response.data.chain;

        if(length > maxLength && this.validateChain(chain)){
          maxLength = length;
          newChain = chain;
        }
      }
    }

    if(newChain){
      this.chain = newChain;
      return true;
    }
      return false;
  }

}

export default blockchain;
