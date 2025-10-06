import { init } from "@instantdb/react";

import schema from "./schema";
import networkListener from "./network-listener";

export default init({
  appId: import.meta.env.PUBLIC_INSTANT_APP_ID,
  schema,
  NetworkListener: networkListener,
});
