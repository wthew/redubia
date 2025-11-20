import Modal from "@/components/modal";
import FormCreateApplication from "./form";

export default function CreateApplicationModal() {
  return (
    <Modal route="/user/dev-panel" title="Criar Aplicação">
      <FormCreateApplication />
    </Modal>
  );
}
