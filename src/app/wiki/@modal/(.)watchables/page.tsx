import Modal from "@/components/modal";
import WikiEntityList from "@/components/pages/wiki/prefetch-items";

export default async function Page() {
  return (
    <Modal title="Produções" route="/wiki">
      <WikiEntityList query="watchables" />
    </Modal>
  );
}
