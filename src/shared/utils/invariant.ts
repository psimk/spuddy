const PREFIX = "Invariant failed";

export default function invariant(
  condition: unknown,
  message?: string | Error,
): asserts condition {
  if (condition) return;

  if (message instanceof Error) throw message;

  throw new Error(message ? `${PREFIX}: ${message}` : PREFIX);
}
