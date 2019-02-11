import * as express from 'express';
import { getDatabase, isClientConnected } from './db/index';
import { makeSampleTable, getSampleData } from './db/models';

export const application = express();

application.get('/', async (req, resp) => {
  const isConnected = isClientConnected();

  if (isConnected.isRight()) {
    const db = getDatabase();
    const users = await makeSampleTable(db, 'users');
    const savedUsers = await getSampleData(users);

    resp.send({ savedUsers });
  }

});
