import type { InstantRules } from "@instantdb/react";

import type { Schema } from "./types";

const rules = {
  attrs: {
    allow: {
      $default: "false",
    },
  },
  lists: {
    bind: ["isOwner", "data.id in auth.ref('$user.lists.id')"],
    allow: {
      view: "isOwner",
      update: "isOwner",
      delete: "isOwner",
    },
  },
  items: {
    bind: ["isOwner", "data.id in auth.ref('$user.items.id')"],
    allow: {
      view: "isOwner",
      update: "isOwner",
      delete: "isOwner",
    },
  },
  $users: {
    allow: {},
  },
} satisfies InstantRules<Schema>;

export default rules;
