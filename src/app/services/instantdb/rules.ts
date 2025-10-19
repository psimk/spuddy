import type { InstantRules } from "@instantdb/react";

import type { Schema } from "./types";

const rules = {
  attrs: {
    allow: {
      $default: "false",
    },
  },
  lists: {
    bind: [
      "isOwner",
      "data.id in auth.ref('$user.lists.id')",
      "isCollaborator",
      "data.id in auth.ref('$user.collaboratingLists.id')",
    ],
    allow: {
      view: "isOwner || isCollaborator",
      update: "isOwner || isCollaborator",
      delete: "isOwner",
    },
  },
  items: {
    bind: [
      "isOwner",
      "data.id in auth.ref('$user.items.id')",
      "isCollaborator",
      "data.ref('list.id')[0] in auth.ref('$user.collaboratingLists.id')",
    ],
    allow: {
      view: "isOwner || isCollaborator",
      update: "isOwner || isCollaborator",
      delete: "isOwner || isCollaborator",
    },
  },
  $users: {
    allow: {
      view: "true",
    },
  },
} satisfies InstantRules<Schema>;

export default rules;
