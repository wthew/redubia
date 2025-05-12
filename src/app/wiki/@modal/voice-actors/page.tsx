import Modal from "@/components/modal";
import WikiEntityList from "@/components/pages/wiki/prefetch-items";

export default async function Page() {
  return (
    <Modal title="Dubladores" route="/wiki" replace>
      <WikiEntityList query="voice-actors" />
    </Modal>
  );
}
