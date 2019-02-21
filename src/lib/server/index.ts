import * as Express from 'express';
import * as bodyParser from 'body-parser';
import { FalconEventFunction, MethodTypes } from './interfaces';

let app: Express.Application;
let functions: FalconEventFunction[] = [];

export const createServer = async () => {
  app.listen(8081, async () => {
    console.log('all engines running on port 8081');
  })
}


export const method = (methodType: MethodTypes, url: string) =>{
  return (t, n, descriptor) => {
    const falconEvent: FalconEventFunction = {
      method: methodType,
      url,
      function: descriptor.value
    }

    addEndpoint(falconEvent);
    return descriptor
  }
}

export const get = (url: string) => {
  return (t, n, descriptor) => {
    const falconEvent: FalconEventFunction = {
      method: MethodTypes.get,
      url,
      function: descriptor.value
    }

    addEndpoint(falconEvent);
    return descriptor
  }
}

const addEndpoint = (endpoint: FalconEventFunction) => {
  functions = [...functions, endpoint];
  generateEndpoints();
}

export const generateEndpoints = () => {
  if (!app) {
    app = Express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }

  functions.forEach((func) => {
    switch (func.method) {
      case MethodTypes.get:
        app.get(func.url, (req, resp) => {
          func.function.apply(this, [req.params, resp])
        });
        break;
      case MethodTypes.post:
        app.post(func.url, (req, resp) => {
          console.log(req.body)
          func.function.apply(this, [req.body, resp])
        });
        break;
      default:
        break;
    }
  });
};

export * from './interfaces';
