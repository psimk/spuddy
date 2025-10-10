import { useEffect } from "react";

import db from "@app/services/instantdb/db";

export default function GuestLogin() {
  useEffect(() => {
    db.auth.signInAsGuest();
  }, []);

  return null;
}
