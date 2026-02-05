export type Item = {
  id: string;
  text: string;
};

export type Section = {
  id: string;
  name: string;
};

export type Data = {
  items: Record<string, Item>;
  sections: Record<string, Section>;
};

export type Positions = {
  sections: ExtendedArray<string>;
  items: Record<string, ExtendedArray<string>>;
};
