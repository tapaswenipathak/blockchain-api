import { URL } from 'url';

class blockchainNode{
  hostAddress = new URL();
  constructor(address: string){
    const parsedURL = new URL(address);
    this.hostAddress = parsedURL.host;
  }
}

export default blockchainNode;
