import type { InstaQLEntity } from "@instantdb/react";

import type schema from "./schema";

export type Schema = typeof schema;
export type Item = InstaQLEntity<Schema, "items">;
export type List = InstaQLEntity<Schema, "lists">;
