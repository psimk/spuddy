import type { InstaQLEntity } from "@instantdb/react";

import type schema from "./schema";

export type Item = InstaQLEntity<typeof schema, "items">;
export type List = InstaQLEntity<typeof schema, "lists">;
