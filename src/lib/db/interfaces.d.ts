export interface ZeroArgsConstructor<T> {
  new (): T;
}

// export const FalconTable = Symbol();

export interface ClassAnnotation {
  (target: ZeroArgsConstructor<any>): void
}
