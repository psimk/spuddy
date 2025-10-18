export default function orderSorter(
  a: { order: string },
  b: { order: string },
) {
  if (a.order < b.order) return -1;
  if (a.order > b.order) return 1;
  return 0;
}
