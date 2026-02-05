export type Item = {
  id: string;
};

export type Section = Array<Item>;
export type Sections = Record<string, Section>;
