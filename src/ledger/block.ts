import transaction from './transaction';

class block{
  index: number;
  data: string;
  previousHash: string;
  hash: string;
  timestamp: number;
  nonce: number;
  transactions: Array<transaction>;

  constructor(data: string){
    this.index = 0;
    this.data = data;
    this.timestamp = Date.now();
    this.hash = '';
    this.previousHash = '';
    this.nonce = 0;
    this.transactions = [];
  }
}

export default block;
