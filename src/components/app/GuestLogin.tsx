import { useEffect } from "react";

import db from "@services/instantdb/db";
import networkListener from "@services/instantdb/network-listener";

export default function GuestLogin() {
  useEffect(() => {
    db.auth.signInAsGuest();
    // this doesn't run because the guest is already logged in
    networkListener.forceOffline();
  }, []);

  return null;
}
