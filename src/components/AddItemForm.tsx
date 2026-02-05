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
    <footer className="sticky bottom-0 p-4 pt-0">
      <form
        action={handleSubmit}
        className="bg-base-100 rounded-box drop-shadow-xl/30 p-2"
      >
        <div className="flex">
          <input
            type="text"
            name="text"
            placeholder="Add new item..."
            className="input input-ghost flex-1 rounded-xl"
            autoFocus
          />
        </div>
      </form>
    </footer>
  );
}
