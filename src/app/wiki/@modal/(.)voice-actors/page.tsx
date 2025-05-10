import Modal from "@/components/modal";
import WikiEntityList from "@/components/pages/wiki/entity-list";

export default async function Page() {

  return (
    <Modal title="Dubladores" route="/wiki">
      <WikiEntityList namespace="voice-actors" />
    </Modal>
  );
}
