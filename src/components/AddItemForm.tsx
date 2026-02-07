type Props = {
  action?: (formData: FormData) => void;
  disabled?: boolean;
};

export default function AddItemForm({ action, disabled }: Props) {
  return (
    <footer className="sticky bottom-0 p-4 pt-0">
      <form
        action={action}
        className="rounded-box bg-base-100 p-4 drop-shadow-xl/30"
      >
        <div className="flex">
          <input
            type="text"
            name="text"
            disabled={disabled}
            placeholder="Add new item..."
            className="flex-1 outline-none h-6"
            autoFocus
          />
        </div>
      </form>
    </footer>
  );
}
