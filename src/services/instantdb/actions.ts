import { id } from "@instantdb/react";

import db from "./db";
import { itemsQuery } from "./queries";
import type { Item } from "./types";

export function createList(title: string = "") {
  return db.transact(
    db.tx.lists[id()].create({
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  );
}

let newItemPosition = 100_0000;

function getOptimisticNewItemPosition() {
  newItemPosition++;
  return newItemPosition;
}

export async function createItem(text: string, listId: string) {
  const itemId = id();

  const itemsQueryPromise = db.queryOnce(itemsQuery(listId));

  await db.transact([
    db.tx.items[itemId].create({
      text: text,
      done: false,
      updatedAt: new Date(),
      createdAt: new Date(),
      position: getOptimisticNewItemPosition(),
    }),
    db.tx.lists[listId].link({ items: itemId }),
  ]);

  const { data } = await itemsQueryPromise;

  return db.transact(
    db.tx.items[itemId].update({ position: data.items.length - 1 }),
  );
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

export async function updateItemPositions(items: ReadonlyArray<Item>) {
  const updates = [];

  for (const [index, item] of items.entries()) {
    if (index === item.position) continue;

    updates.push(
      db.tx.items[item.id].update({
        ...item,
        position: index,
        updatedAt: Date.now(),
      }),
    );
  }

  return db.transact(updates);
}
