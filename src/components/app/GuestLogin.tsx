import { useEffect } from "react";

import db from "@services/instantdb/db";

export default function GuestLogin() {
  useEffect(() => {
    db.auth.signInAsGuest();
  }, []);

  return null;
}
