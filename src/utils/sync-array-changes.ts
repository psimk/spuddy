export default function syncArrayChanges(
  target: ExtendedArray<string>,
  source: Array<string>,
) {
  // Find differences and apply minimal changes
  if (target.length === 0 && source.length > 0) {
    // Initialize empty array
    for (const item of source) {
      target.push(item);
    }
    return;
  }

  // Simple approach: if arrays differ, update efficiently
  // For move operations, this typically changes just a few positions
  let i = 0;
  while (i < Math.max(target.length, source.length)) {
    if (i >= source.length) {
      // Remove extra items from target
      target.deleteAt(target.length - 1);
    } else if (i >= target.length) {
      // Add new items to target
      target.push(source[i]);
      i++;
    } else if (target[i] !== source[i]) {
      // Replace differing item
      target[i] = source[i];
      i++;
    } else {
      i++;
    }
  }
}
