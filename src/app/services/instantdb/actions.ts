import type { move } from "@dnd-kit/helpers";
import { IndexGenerator } from "fractional-indexing-jittered";
import { id } from "@instantdb/react";

import invariant from "@shared/utils/invariant";

import db from "./db";
import type { Item } from "./types";

export async function createList(title: string = "") {
  const userId = (await db.getAuth())?.id;
  invariant(userId, "User must be authenticated to create a list");

  const listId = id();

  return db.transact([
    db.tx.lists[listId]
      .create({
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .link({ owner: userId }),
  ]);
}

export function removeList(listId: string) {
  return db.transact(db.tx.lists[listId].delete());
}

export function renameList(listId: string, title: string) {
  return db.transact(
    db.tx.lists[listId].update({ title, updatedAt: new Date() }),
  );
}

const USER_JITTER = true;

export async function createItem(
  text: string,
  listId: string,
  existingItems: ReadonlyArray<Item>,
) {
  const itemId = id();
  const userId = (await db.getAuth())?.id;
  invariant(userId, "User must be authenticated to create a list");

  const promise = db.transact(
    db.tx.items[itemId]
      .create({
        text: text,
        done: false,
        updatedAt: new Date(),
        createdAt: new Date(),
        order: new IndexGenerator(
          existingItems.map((item) => item.order),
          { useJitter: USER_JITTER },
        ).keyEnd(),
      })
      .link({
        list: listId,
        owner: userId,
      }),
  );

  promise.catch((e) => {
    console.error("Failed to create item", e);
  });

  return promise;
}

export function collectItem(itemId: string) {
  return db.transact(
    db.tx.items[itemId].update({ done: true, updatedAt: new Date() }),
  );
}

export function unCollectItem(itemId: string) {
  return db.transact(
    db.tx.items[itemId].update({ done: false, updatedAt: new Date() }),
  );
}

export function removeItem(itemId: string) {
  return db.transact(db.tx.items[itemId].delete());
}

export function updateItemPositions(
  items: ReadonlyArray<Item>,
  event: Parameters<typeof move>[1],
) {
  const {
    operation: { source, target },
  } = event;

  if (!target || !source) return;
  if (source.id === target.id) return;

  let sourceItem: Nullable<Item> = null;
  let targetItem: Nullable<Item> = null;

  for (const item of items) {
    if (item.id === source.id) {
      sourceItem = item;
      continue;
    }

    if (item.id === target.id) {
      targetItem = item;
      continue;
    }

    if (sourceItem && targetItem) break;
  }

  if (!sourceItem || !targetItem) return;

  return db.transact([
    db.tx.items[source.id].update({
      order: targetItem.order,
      updatedAt: Date.now(),
    }),
    db.tx.items[target.id].update({
      order: sourceItem.order,
      updatedAt: Date.now(),
    }),
  ]);
}
