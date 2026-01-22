import { useEffect } from "react";

import { signInAsGuest } from "@app/services/instantdb/actions";

export default function Login() {
  useEffect(() => {
    signInAsGuest();
  }, []);

  return null;
}
