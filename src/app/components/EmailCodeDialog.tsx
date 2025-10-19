import { type Ref, forwardRef, useEffect, useState } from "react";

import useTimeout from "@shared/hooks/use-timeout";

import { signInWithMagicCode } from "@app/services/instantdb/actions";

type Props = {
  email: Nullable<string>;
};

export default forwardRef(function EmailCodeDialog(
  { email }: Props,
  ref: Ref<HTMLDialogElement>,
) {
  const [code, setCode] = useState<Nullable<number>>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Nullable<string>>(null);

  useTimeout(() => setError(null), 5_000);

  async function handleLoginClick() {
    if (!email || code === null) return;

    setIsPending(true);
    try {
      await signInWithMagicCode(email, String(code));
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Email Login</h3>
          <fieldset className="fieldset" disabled={isPending}>
            <legend className="fieldset-legend">Magic Code</legend>
            <input
              className="input"
              type="password"
              required
              minLength={6}
              maxLength={6}
              placeholder="xxxxxx"
              onChange={(e) => setCode(Number(e.target.value))}
            />
          </fieldset>
          <div className="modal-action">
            <button
              className="btn btn-success"
              onClick={handleLoginClick}
              disabled={!code || isPending}
            >
              Login
            </button>
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      {error && (
        <div className="toast" onClick={() => setError(null)}>
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </>
  );
});
