import { init } from "@instantdb/react";

import schema from "./schema";

export default init({
  appId: import.meta.env.PUBLIC_INSTANT_APP_ID,
  schema,
  devtool: false,
});
