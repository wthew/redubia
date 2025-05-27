import Modal from "@/components/modal";
import WikiEntityList from "@/components/wiki/prefetch-items";

export default async function Page() {
  return (
    <Modal title="Dubladores" route="/wiki">
      <WikiEntityList query="voice-actors" />
    </Modal>
  );
}
