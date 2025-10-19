import { type FormEvent, useCallback, useRef, useState } from "react";

import useAsyncFunction from "@shared/hooks/use-async-function";
import useTimeout from "@shared/hooks/use-timeout";

import EmailCodeDialog from "@app/components/EmailCodeDialog";
import { sendMagicCode, signInAsGuest } from "@app/services/instantdb/actions";

export default function Login() {
  const emailCodeElementRef = useRef<HTMLDialogElement>(null);
  const {
    handleAsync: handleEmailAsync,
    isPending: isEmailPending,
    error: emailError,
    resetError: resetEmailError,
  } = useAsyncFunction();
  const {
    handleAsync: handleGuestAsync,
    isPending: isGuestPending,
    error: guestError,
    resetError: resetGuestError,
  } = useAsyncFunction();

  const [email, setEmail] = useState<Nullable<string>>(null);

  const resetError = useCallback(() => {
    resetEmailError();
    resetGuestError();
  }, [resetEmailError, resetGuestError]);

  useTimeout(resetError, 5_000);

  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() ?? "";

    if (!email.trim()) return;

    handleEmailAsync(
      () => sendMagicCode(email),
      () => {
        setEmail(email);
        emailCodeElementRef.current?.showModal();
      },
    );
  }

  function handleGuestButtonClick() {
    handleGuestAsync(signInAsGuest);
  }

  const error = emailError || guestError;

  return (
    <div className="flex w-dvw flex-col">
      <section className="relative mx-auto w-dvw max-w-2xl flex-1 overflow-x-hidden flex flex-col items-center justify-center gap-2">
        <form onSubmit={handleEmailSubmit}>
          <fieldset
            className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
            disabled={isEmailPending || isGuestPending}
          >
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              required
              placeholder="Email"
            />

            <button className="btn btn-neutral mt-4" type="submit">
              Continue
              {isEmailPending && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>
            <button
              name="guest"
              type="button"
              className="btn btn-ghost"
              onClick={handleGuestButtonClick}
            >
              Continue as Guest
              {isGuestPending && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>
          </fieldset>
        </form>
      </section>
      <EmailCodeDialog ref={emailCodeElementRef} email={email} />
      {error && (
        <div className="toast" onClick={resetError}>
          <div className="alert alert-error">
            <span>{error.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
