import { parseAsBoolean, useQueryState } from "nuqs";

const useCreateWorkspaceDialog = () => {
  const [open, setOpen] = useQueryState(
    "new-workspace",
    parseAsBoolean.withDefault(false)
  );

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return {
    open, // phụ thuộc vào url true/false
    onOpen, // ép nó true
    onClose, // ép nó false
  };
};

export default useCreateWorkspaceDialog;
