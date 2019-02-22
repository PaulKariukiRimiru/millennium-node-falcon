export enum MethodTypes {
  post = 'post',
  get = 'get',
  delete = 'delete',
  put = 'put'
}

export interface FalconEventFunction {
  method: MethodTypes;
  url: string;
  function: (args: any, resp: Express.Response) => void;
}