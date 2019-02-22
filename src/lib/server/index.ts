import * as Express from 'express';
import * as bodyParser from 'body-parser';
import { FalconEventFunction, MethodTypes } from './interfaces';

let app: Express.Application;
let server;
export let functions: FalconEventFunction[] = [];

export const createServer = async () => {
  if (!server) {
    server = app.listen(process.env.PORT, async () => {
      console.log('all engines running on port 8081');
    });
  }
  return server;
}

export const getApp = () => app;

export const closeServer = async () => await server.close();

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

export const addEndpoint = (endpoint: FalconEventFunction) => {
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
          func.function.apply({}, [req.params, resp])
        });
        break;
      case MethodTypes.post:
        app.post(func.url, (req, resp) => {
          func.function.apply({}, [req.body, resp])
        });
        break;
      case MethodTypes.delete:
        app.delete(func.url, (req, resp) => {
          func.function.apply({}, [req.body, resp])
        });
        break;
      case MethodTypes.put:
        app.put(func.url, (req, resp) => {
          func.function.apply({}, [req.body, resp])
        });
        break;
      default:
        break;
    }
  });
};

export * from './interfaces';
