import db from "@services/instantdb/db";

import { itemsQuery } from "@services/instantdb/queries";
import CollectedList from "./CollectedList";
import ToGetList from "./ToGetList";
import {
  collectItem,
  removeItem,
  unCollectItem,
  updateItemPositions,
} from "@services/instantdb/actions";

type Props = {
  id: string;
};

export default function List({ id }: Props) {
  const { data: toGetData } = db.useQuery(itemsQuery({ list: id }));
  const { data: collectedData } = db.useQuery(
    itemsQuery({ list: id, completed: true }),
  );

  const toGetItems = toGetData?.items ?? [];
  const collectedItems = collectedData?.items ?? [];

  return (
    <>
      {toGetItems.length === 0 && collectedItems.length > 0 ? (
        <div className="grid h-full place-items-center text-center">
          <p className="text-base-content">All items have been collected.</p>
        </div>
      ) : (
        <ToGetList
          items={toGetItems}
          onReorder={updateItemPositions}
          onRemove={removeItem}
          onCollect={collectItem}
        />
      )}
      <div className="divider text-base-content/30">collected</div>
      <CollectedList
        items={collectedData?.items ?? []}
        onRemove={removeItem}
        onUnCollect={unCollectItem}
      />
    </>
  );
}
