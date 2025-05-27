import Modal from "@/components/modal";
import WikiEntityList from "@/components/wiki/prefetch-items";

export default async function Page() {
  return (
    <Modal title="Produções" route="/wiki" replace>
      <WikiEntityList query="watchables" />
    </Modal>
  );
}
