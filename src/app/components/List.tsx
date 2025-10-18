import { useMemo } from "react";

import orderSorter from "@shared/utils/order-sorter";

import CollectedList from "@app/components/CollectedList";
import ListTitleInput from "@app/components/ListTitleInput";
import ToGetList from "@app/components/ToGetList";
import {
  collectItem,
  removeItem,
  unCollectItem,
  updateItemPositions,
} from "@app/services/instantdb/actions";
import db from "@app/services/instantdb/db";
import { itemsQuery } from "@app/services/instantdb/queries";

type Props = {
  id: string;
  disableAutoScroll?: boolean;
};

export default function List({ id, disableAutoScroll }: Props) {
  const { data: toGetData } = db.useQuery(
    itemsQuery({ list: id, completed: false }),
  );
  const { data: collectedData } = db.useQuery(
    itemsQuery({ list: id, completed: true }),
  );

  const toGetItems = useMemo(
    () => toGetData?.items?.toSorted(orderSorter) ?? [],
    [toGetData],
  );

  const collectedItems = useMemo(
    () => collectedData?.items?.toSorted(orderSorter) ?? [],
    [collectedData],
  );

  if (toGetItems.length === 0 && collectedItems.length === 0) {
    return (
      <>
        <ListTitleInput list={id} />
        <div className="grid h-full place-items-center text-center">
          <p className="text-base-content max-w-xs">
            Use the input below, to add some items.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <ListTitleInput list={id} />
      {toGetItems.length === 0 && collectedItems.length > 0 ? (
        <div className="grid h-full place-items-center text-center">
          <p className="text-base-content">All items have been collected.</p>
        </div>
      ) : (
        <ToGetList
          disableAutoScroll={disableAutoScroll}
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
