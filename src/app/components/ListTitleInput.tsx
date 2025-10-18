import {
  type ChangeEvent,
  type FocusEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import NavigationInput from "@shared/components/NavigationInput";

import { renameList } from "@app/services/instantdb/actions";
import db from "@app/services/instantdb/db";
import { listQuery } from "@app/services/instantdb/queries";

export default memo(function ListTitleInput({ list }: { list: string }) {
  const { data: listsData } = db.useQuery(listQuery(list));
  const queriedListTitle = listsData?.lists?.[0].title ?? "";

  useEffect(() => {
    setListTitle(queriedListTitle);
  }, [queriedListTitle]);

  const handleTitleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setListTitle(event.currentTarget.value),
    [],
  );

  const handleTitleInputBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const title = event.currentTarget.value.trim();

      renameList(list, title);
    },
    [list],
  );

  const [listTitle, setListTitle] = useState(queriedListTitle);

  return (
    <div className="sticky top-0 z-10 pb-4">
      <NavigationInput
        className="backdrop-blur-md"
        value={listTitle}
        onChange={handleTitleInputChange}
        onBlur={handleTitleInputBlur}
        placeholder="untitled list"
      />
    </div>
  );
});
