import { ClassAnnotation } from './interfaces';

export const table = (name: string): ClassAnnotation => {
  return constructor => {
    // constructor.prototype[FalconTable] = name;
  }
} 
