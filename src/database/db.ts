import blockchaindb from './db_connection';

const db = blockchaindb.connect();

function getBlockIndex(): Promise<number>{
  let blockIndex = 0;
  return new Promise((resolve, reject) => {
    db.createReadStream
      .on('data', (data) =>{
        ++blockIndex;
      })
      .on('error', (error) => {
        console.error('Error while reading data stream.', error);
        return reject(error);
      })
      .on('close', () => {
        return resolve(blockIndex - 1);
      });
  });
}


function getBlock(id: any): Promise<any>{
  return new Promise((resolve, reject) =>{
    db.get(id)
      .then((value) => resolve(value))
      .catch((error) =>{
        console.error('Id not found.', error);
        return reject(error);
      });
  });
}

function addBlock(value: any): Promise<any>{
  let blockIndex = 0;
  return new Promise((resolve, reject) => {
    db.createReadStream()
      .on('data', (data) => {
        ++blockIndex;
      })
      .on('error', (error) => {
        console.error('Error while reading data stream.', error);
        return reject(error);
      })
      .on('close', async() => {
        await addKey(blockIndex, value);
        return resolve(blockIndex);
      });
  });
}


function addKey(id: any, value: any): Promise<any>{
  return new Promise((resolve, reject) =>{
    db.put(id, value)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.error('Block submission failed', error);
        return reject(error);
      });
  });
}

function deleteAll(): Promise<boolean>{
  let blockIndex = 0;
  return new Promise((resolve, reject) => {
    db.createReadStream
      .on('data', (data) => {
        ++blockIndex;
      })
      .on('error', (error) => {
        console.error('Error while deleting data stream.', error);
        return reject(error);
      })
      .on('close', () => {
        for(let i = 0; i < blockIndex; ++i){
          db.del(i)
            .then(() => resolve(true))
            .catch((error) => {
              console.error('Error while deleting block.', error);
              reject(error);
            });
        }
      });
  });
}

export default {
  getBlockIndex,
  getBlock,
  getByHash,
  addGenesisBlock,
  addBlock,
  addKey,
  deleteBlock,
  deleteAll,
  updateKey
}
