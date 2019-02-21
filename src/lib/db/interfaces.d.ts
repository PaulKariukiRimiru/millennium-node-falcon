export interface ZeroArgsConstructor<T> {
  new (): T;
}

export const FalconTable = Symbol('FalconTable');

export interface ClassAnnotation {
  (target: ZeroArgsConstructor<any>): void
}
