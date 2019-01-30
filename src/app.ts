import * as express from 'express';
import { getDatabase, getConnectionClient } from './db/index';
import { makeSampleTable, getSampleData } from './db/models';

export const application = express();

application.get('/', async (req, resp) => {
  const dbStatus = getConnectionClient();

  if (dbStatus.isRight()) {
    const db = getDatabase('test');
    const users = await makeSampleTable(db, 'users');
    const savedUsers = await getSampleData(users);

    resp.send({ savedUsers });
  }

});
