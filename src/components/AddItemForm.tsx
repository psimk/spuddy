import scrollToBottom from "@utils/scroll-to-bottom";

import useAddItem from "@hooks/useAddItem";

import InputForm from "@components/InputForm";

export default function AddItemForm() {
  const addItem = useAddItem();
  const handleSubmit = (formData: FormData) => {
    const text = formData.get("text")?.toString().trim();

    if (!text) return;

    addItem(text.trim());
    scrollToBottom();
  };

  return (
    <InputForm
      action={handleSubmit}
      formClassName="mr-10 grow"
      name="text"
      autoFocus
      placeholder="..."
    />
  );
}
