import * as falcon from '../';
import { Users } from './Users';

(async () => {
  await falcon.createFalconApp();
  new Users();
})();
