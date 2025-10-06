import { i } from "@instantdb/react";

export default i.schema({
  entities: {
    items: i.entity({
      text: i.string(),
      done: i.boolean(),
      createdAt: i.date(),
      updatedAt: i.date(),
      position: i.number().indexed(),
    }),
    lists: i.entity({
      title: i.string(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),
  },
});
