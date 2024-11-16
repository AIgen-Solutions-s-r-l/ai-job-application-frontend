import { FC, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";

export interface ConfirmProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string; // Texto del título
  confirmText?: string; // Texto del botón de confirmación
  cancelText?: string; // Texto del botón de cancelación
}

const Confirm: FC<ConfirmProps> = ({
  open,
  onConfirm,
  onCancel,
  title = "Are you sure?", // Valor por defecto
  confirmText = "Confirm", // Valor por defecto
  cancelText = "Cancel", // Valor por defecto
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!open) setLoading(false);
  }, [open]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-white dark:bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={() => {
              setLoading(true);
              onConfirm();
            }}
          >
            {loading && <Loader2 className="animate-spin" />}
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Confirm;