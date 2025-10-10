import { BrowserRouter, Route, Routes } from "react-router";

import db from "@app/services/instantdb/db";
import ListLayout from "@app/layouts/ListLayout";
import GuestLogin from "@app/routes/guest-login";
import ListId from "@app/routes/list-id";
import ListRedirect from "./routes/list-redirect";

export default function App() {
  return (
    <>
      <db.SignedIn>
        <BrowserRouter basename="/app">
          <Routes>
            <Route element={<ListLayout />}>
              <Route index element={<ListRedirect />} />
              <Route path=":listId" element={<ListId />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </db.SignedIn>
      <db.SignedOut>
        <GuestLogin />
      </db.SignedOut>
    </>
  );
}
