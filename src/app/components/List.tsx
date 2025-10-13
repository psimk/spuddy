import { useEffect, useMemo, useState } from "react";

import db from "@app/services/instantdb/db";
import { itemsQuery, listQuery } from "@app/services/instantdb/queries";
import {
  collectItem,
  removeItem,
  renameList,
  unCollectItem,
  updateItemPositions,
} from "@app/services/instantdb/actions";
import { useListContext } from "@app/contexts/list-context";
import CollectedList from "@app/components/CollectedList";
import ToGetList from "@app/components/ToGetList";
import NavigationInput from "@shared/components/NavigationInput";

type Props = {
  id: string;
  disableAutoScroll?: boolean;
};

export default function List({ id, disableAutoScroll }: Props) {
  const { data: listsData } = db.useQuery(listQuery(id));
  const { data: allData } = db.useQuery(itemsQuery({ list: id }));
  const { data: toGetData } = db.useQuery(
    itemsQuery({ list: id, completed: false }),
  );
  const { data: collectedData } = db.useQuery(
    itemsQuery({ list: id, completed: true }),
  );

  const { setListContent } = useListContext();

  const allItems = useMemo(
    () =>
      allData?.items?.toSorted((a, b) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      }),
    [allData],
  );

  const toGetItems = useMemo(
    () =>
      toGetData?.items?.toSorted((a, b) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      }) ?? [],
    [toGetData],
  );

  const collectedItems = useMemo(
    () =>
      collectedData?.items?.toSorted((a, b) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      }) ?? [],
    [collectedData],
  );

  useEffect(() => {
    if (!allItems) return;

    setListContent(id, allItems);
  }, [allItems, setListContent, id]);

  const queriedListTitle = listsData?.lists?.[0].title ?? "";

  const [listTitle, setListTitle] = useState(queriedListTitle);

  useEffect(() => {
    setListTitle(queriedListTitle);
  }, [queriedListTitle]);

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
      <div className="sticky top-0 z-10 pb-4">
        <NavigationInput
          className="backdrop-blur-md"
          value={listTitle}
          onChange={(event) => setListTitle(event.currentTarget.value)}
          onBlur={(event) => {
            if (!listTitle) return;

            const title = event.currentTarget.value.trim();

            renameList(id, title);
          }}
          placeholder="list title"
        />
      </div>
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
