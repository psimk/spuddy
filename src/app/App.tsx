import { BrowserRouter, Route, Routes } from "react-router";

import ListLayout from "@app/layouts/ListLayout";
import GuestLogin from "@app/routes/guest-login";
import ListId from "@app/routes/list-id";
import db from "@app/services/instantdb/db";

import ListRedirect from "./routes/list-redirect";

export default function App() {
  return (
    <>
      <db.SignedIn>
        <BrowserRouter basename="/app">
          <Routes>
            <Route index element={<ListRedirect />} />
            <Route path=":listId" element={<ListLayout />}>
              <Route index element={<ListId />} />
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
