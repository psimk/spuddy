import { i } from "@instantdb/react";

export default i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    items: i.entity({
      text: i.string(),
      createdAt: i.date(),
      updatedAt: i.date(),
      order: i.string().indexed(),
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
    listCollaborators: {
      forward: {
        on: "lists",
        has: "many",
        label: "collaborators",
      },
      reverse: { on: "$users", has: "many", label: "collaboratingLists" },
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
