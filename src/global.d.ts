declare global {
  export type Nullable<T> = T extends any ? T | null : never;
}

export {};
