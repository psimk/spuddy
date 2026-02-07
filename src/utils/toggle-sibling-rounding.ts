export default function toggleSiblingRounding(
  element: Element,
  state: "on" | "off",
) {
  const { previousElementSibling, nextElementSibling } = element;

  if (!(previousElementSibling && nextElementSibling)) return;

  if (state === "on") {
    nextElementSibling.classList.add("rounded-t-box");
    previousElementSibling.classList.add("rounded-b-box");
    return;
  }

  nextElementSibling.classList.remove("rounded-t-box");
  previousElementSibling.classList.remove("rounded-b-box");
}
