type Nullable<T> = T | null;

type ExtendedArray<T> = Array<T> & {
  insertAt(index: number, ...args: Array<T>): ExtendedArray<T>;
  deleteAt(index: number, numDelete?: number): ExtendedArray<T>;
};
