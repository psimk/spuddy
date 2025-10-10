import { useEffect } from "react";

import db from "@app/services/instantdb/db";
import { itemsQuery } from "@app/services/instantdb/queries";
import {
  collectItem,
  removeItem,
  unCollectItem,
  updateItemPositions,
} from "@app/services/instantdb/actions";
import { useListContext } from "@app/contexts/list-context";
import CollectedList from "@app/components/CollectedList";
import ToGetList from "@app/components/ToGetList";

type Props = {
  id: string;
};

export default function List({ id }: Props) {
  const { data: allData } = db.useQuery(itemsQuery({ list: id }));
  const { data: toGetData } = db.useQuery(
    itemsQuery({ list: id, completed: false }),
  );
  const { data: collectedData } = db.useQuery(
    itemsQuery({ list: id, completed: true }),
  );

  const { setListContent } = useListContext();

  useEffect(() => {
    if (!allData?.items) return;

    setListContent(id, allData.items);
  }, [allData, setListContent, id]);

  const toGetItems = toGetData?.items ?? [];
  const collectedItems = collectedData?.items ?? [];

  if (toGetItems.length === 0 && collectedItems.length === 0) {
    return (
      <div className="grid h-full place-items-center text-center">
        <p className="text-base-content max-w-xs">
          Use the input below, to add some items.
        </p>
      </div>
    );
  }

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
      {collectedItems.length > 0 && (
        <>
          <div className="divider text-base-content/30">collected</div>
          <CollectedList
            items={collectedItems}
            onRemove={removeItem}
            onUnCollect={unCollectItem}
          />
        </>
      )}
    </>
  );
}
