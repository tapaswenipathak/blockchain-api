import * as level from 'level';

const blockchaindb = './blockchaindb';
const db = level(blockchaindb);

export default {
  connect: () => db
};
