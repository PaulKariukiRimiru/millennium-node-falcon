import * as falcon from '../';
import { MethodTypes, method } from '../';

export class Users {
  constructor(){}

  @method(MethodTypes.get, '/')
  helloSample(req, res) {
    res.send({ message: 'hello from falcon' })
  }

  @method(MethodTypes.get, '/:name')
  helloFello(params, res) {
    res.send({ message: `hello ${params.name}` })
  }

  @falcon.method(MethodTypes.post, '/')
  firstPost(body, res) {
    res.json(body);
  }

  @falcon.method(MethodTypes.delete, '/')
  firstdelete(body, res) {
    res.json(body);
  }

  @falcon.method(MethodTypes.put, '/')
  firstput(body, res) {
    res.json(body);
  }
}
