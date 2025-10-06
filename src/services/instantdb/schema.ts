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
  links: {
    listOwner: {
      forward: { on: "lists", has: "one", label: "owner", onDelete: "cascade" },
      reverse: { on: "$users", has: "many", label: "lists" },
    },
    listItems: {
      forward: { on: "lists", has: "many", label: "items" },
      reverse: { on: "items", has: "one", label: "list" },
    },
    itemOwner: {
      forward: { on: "items", has: "one", label: "owner" },
      reverse: { on: "$users", has: "many", label: "items" },
    },
  },
});
