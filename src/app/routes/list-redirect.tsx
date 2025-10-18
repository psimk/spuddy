import { useEffect } from "react";
import { useNavigate } from "react-router";

import useInstantLists from "@app/hooks/use-instant-lists";
import ListSkeleton from "@app/layouts/ListSkeleton";

export default function ListRedirect() {
  const navigate = useNavigate();
  const { data } = useInstantLists();

  useEffect(() => {
    const lists = data?.lists ?? [];
    if (lists.length === 0) return;
    navigate(lists[0].id, { replace: true });
  }, [data, navigate]);

  return <ListSkeleton />;
}
