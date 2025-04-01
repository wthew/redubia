import Modal from "@/components/modal";
import WikiEntityList, { getData } from "@/components/pages/wiki/namespaces";

export default async function Page() {
  const data = await getData("voice-actors");

  return (
    <Modal title="Dubladores" route="/wiki" replace>
      <WikiEntityList data={data} />
    </Modal>
  );
}
