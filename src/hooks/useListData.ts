import type { AutomergeUrl } from "@automerge/automerge-repo";
import useDataDocument from "./useDataDocument";

export default function useListData() {
  const [dataDoc, changeData] = useDataDocument();

  const addItemUrl = (itemUrl: AutomergeUrl) => {
    changeData((doc) => {
      if (!doc.itemUrls.includes(itemUrl)) {
        doc.itemUrls.push(itemUrl);
      }
    });
  };

  const removeItemUrl = (itemUrl: AutomergeUrl) => {
    changeData((doc) => {
      const index = doc.itemUrls.indexOf(itemUrl);
      if (index !== -1) {
        doc.itemUrls.splice(index, 1);
      }
    });
  };

  const addSectionUrl = (sectionUrl: AutomergeUrl) => {
    changeData((doc) => {
      if (!doc.sectionUrls.includes(sectionUrl)) {
        doc.sectionUrls.push(sectionUrl);
      }
    });
  };

  const removeSectionUrl = (sectionUrl: AutomergeUrl) => {
    changeData((doc) => {
      const index = doc.sectionUrls.indexOf(sectionUrl);
      if (index !== -1) {
        doc.sectionUrls.splice(index, 1);
      }
    });
  };

  return {
    ...dataDoc,
    addItemUrl,
    removeItemUrl,
    addSectionUrl,
    removeSectionUrl,
    changeData,
  };
}
