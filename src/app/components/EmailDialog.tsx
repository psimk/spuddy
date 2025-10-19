import {
  type Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import useTimeout from "@shared/hooks/use-timeout";
import invariant from "@shared/utils/invariant";

import { useListContext } from "@app/contexts/list-context";
import db from "@app/services/instantdb/db";
import { userByEmailQuery } from "@app/services/instantdb/queries";

export default forwardRef(function EmailDialog(_, ref: Ref<HTMLDialogElement>) {
  const innerRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => innerRef.current as HTMLDialogElement, [
    innerRef,
  ]);
  const { activeList } = useListContext();
  const { user: self } = db.useAuth();

  const selfEmail = self?.email ?? null;
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState<Nullable<string>>(null);
  const [error, setError] = useState<Nullable<string>>(null);
  const [successMessage, setSuccessMessage] = useState<Nullable<string>>(null);

  useTimeout(() => setError(null), 5_000);
  useTimeout(() => setSuccessMessage(null), 5_000);

  async function handleShareClick() {
    if (!email) return;
    if (!selfEmail) return;

    setIsPending(true);

    try {
      invariant(
        email !== selfEmail,
        new Error("You cannot share with yourself."),
      );

      const {
        data: {
          $users: [user],
        },
      } = await db.queryOnce(userByEmailQuery(email));

      invariant(user, new Error("No user found with the provided email."));

      await db.transact(
        db.tx.lists[activeList.id].link({ collaborators: [user.id] }),
      );

      innerRef.current?.close();

      setSuccessMessage("List shared successfully!");
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <dialog ref={innerRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Email Login</h3>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Magic Code</legend>
            <input
              className="input"
              type="email"
              required
              placeholder="jane@doe.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <div className="modal-action">
            <button
              className="btn btn-success"
              onClick={handleShareClick}
              disabled={!email || isPending}
            >
              Share
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

      {successMessage && (
        <div className="toast" onClick={() => setSuccessMessage(null)}>
          <div className="alert alert-success">
            <span>{successMessage}</span>
          </div>
        </div>
      )}
    </>
  );
});
