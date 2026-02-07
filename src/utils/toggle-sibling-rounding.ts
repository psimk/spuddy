export default function toggleSiblingRounding(
  element: Element,
  state: "on" | "off",
) {
  const { previousElementSibling, nextElementSibling } = element;

  if (!(previousElementSibling && nextElementSibling)) return;

  if (state === "on") {
    nextElementSibling.firstElementChild?.classList.add("rounded-t-box");
    previousElementSibling.firstElementChild?.classList.add("rounded-b-box");
    return;
  }

  nextElementSibling.firstElementChild?.classList.remove("rounded-t-box");
  previousElementSibling.firstElementChild?.classList.remove("rounded-b-box");
}
