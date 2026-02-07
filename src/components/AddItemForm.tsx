type Props = {
  action?: (formData: FormData) => void;
  disabled?: boolean;
};

export default function AddItemForm({ action, disabled }: Props) {
  return (
    <form
      action={action}
      className="mr-18 grow rounded-box bg-base-100/90 p-4 drop-shadow-xl/30 backdrop-blur-2xl"
    >
      <div className="flex">
        <input
          type="text"
          name="text"
          disabled={disabled}
          placeholder="Add new item..."
          className="h-6 flex-1 outline-none"
          autoFocus
        />
      </div>
    </form>
  );
}
