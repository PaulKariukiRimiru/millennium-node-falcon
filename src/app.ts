import * as express from 'express';

export const application = express();

application.get('/', (req, resp) => {
  resp.send('Helllo express');
});
