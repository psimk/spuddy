import { DragDropManager } from "@dnd-kit/dom";

import { defaultPreset } from "@dnd-kit/dom";
import { Debug } from "@dnd-kit/dom/plugins/debug";

const url = new URL(document.URL);

const isDebugMode = url.searchParams.has("debug");

export default new DragDropManager({
  plugins: isDebugMode
    ? [Debug, ...defaultPreset.plugins]
    : defaultPreset.plugins,
});
