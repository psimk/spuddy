import scrollToBottom from "@utils/scroll-to-bottom";

import useAddItem from "@hooks/useAddItem";

export default function AddItemForm() {
  const addItem = useAddItem();

  const handleSubmit = (formData: FormData) => {
    const text = formData.get("text")?.toString().trim();

    if (!text) return;

    addItem(text.trim());
    scrollToBottom();
  };

  return (
    <form
      action={handleSubmit}
      className="sticky bottom-0 bg-base-100 p-4 shadow-lg"
    >
      <div className="flex gap-2">
        <input
          type="text"
          name="text"
          placeholder="Add new item..."
          className="input input-bordered flex-1"
          autoFocus
        />
      </div>
    </form>
  );
}
