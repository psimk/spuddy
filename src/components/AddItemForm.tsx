type Props = {
  action?: (formData: FormData) => void;
  disabled?: boolean;
};

export default function AddItemForm({ action, disabled }: Props) {
  return (
    <footer className="sticky bottom-0 p-4 pt-0">
      <form
        action={action}
        className="bg-base-100 rounded-box drop-shadow-xl/30 p-2"
      >
        <div className="flex">
          <input
            type="text"
            name="text"
            disabled={disabled}
            placeholder="Add new item..."
            className="input input-ghost flex-1 rounded-xl"
            autoFocus
          />
        </div>
      </form>
    </footer>
  );
}
