import { type ValidQuery } from "@instantdb/react";

import type { Schema } from "./types";

function query<Q extends ValidQuery<Q, Schema>>(query: Q): Q {
  return query;
}

export function listsQuery() {
  return query({
    lists: {},
  });
}

export function listQuery(id: string) {
  return query({
    lists: {
      $: {
        where: { id },
      },
    },
  });
}

export function userByEmailQuery(email: string) {
  return query({
    $users: {
      $: {
        where: { email },
      },
    },
  });
}

export function itemsQuery({
  list,
  completed,
}: {
  list: string;
  completed?: boolean;
}) {
  return query({
    items: {
      $: {
        where: { done: completed, list },
      },
    },
  });
}
