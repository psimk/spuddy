import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useListContext } from "@app/contexts/list-context";

export default function ListRedirect() {
  const navigate = useNavigate();
  const { lists } = useListContext();

  useEffect(() => {
    navigate(lists[0].id, { replace: true });
  }, []);

  return null;
}
