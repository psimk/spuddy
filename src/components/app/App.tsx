import db from "@services/instantdb/db";

import Main from "./Main";
import GuestLogin from "./GuestLogin";

export default function App() {
  return (
    <>
      <db.SignedIn>
        <Main />
      </db.SignedIn>
      <db.SignedOut>
        <GuestLogin />
      </db.SignedOut>
    </>
  );
}
