import { useMemo } from "react";

import orderSorter from "@shared/utils/order-sorter";

import ListTitleInput from "@app/components/ListTitleInput";
import ToGetList from "@app/components/ToGetList";
import {
  removeItem,
  updateItemPositions,
} from "@app/services/instantdb/actions";
import db from "@app/services/instantdb/db";
import { itemsQuery } from "@app/services/instantdb/queries";

type Props = {
  id: string;
  disableAutoScroll?: boolean;
};

export default function List({ id, disableAutoScroll }: Props) {
  const { data: toGetData } = db.useQuery(itemsQuery({ list: id }));

  const toGetItems = useMemo(
    () => toGetData?.items?.toSorted(orderSorter) ?? [],
    [toGetData],
  );

  if (toGetItems.length === 0) {
    return (
      <div className="h-full">
        <ListTitleInput list={id} />
        <div className="grid h-full place-items-center text-center">
          <p className="text-base-content max-w-xs">
            Use the input below, to add some items.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {toGetItems.length === 0 ? (
        <>
          <ListTitleInput list={id} />
          <div className="grid h-full place-items-center text-center">
            <p className="text-base-content">All items have been collected.</p>
          </div>
        </>
      ) : (
        <ToGetList
          disableAutoScroll={disableAutoScroll}
          items={toGetItems}
          onReorder={updateItemPositions}
          onRemove={removeItem}
          onCollect={removeItem}
        >
          <li>
            <ListTitleInput list={id} />
          </li>
        </ToGetList>
      )}
    </>
  );
}
