import * as db from './db';
import * as server from './server';

export const createFalconApp = () => {
  server.createServer();
};

export * from './server';
