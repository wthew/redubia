import Modal from "@/components/modal";
import WikiEntityList, { getData } from "@/components/pages/wiki/namespaces";

export default async function Page() {
  const data = await getData("watchables");

  return (
    <Modal title="Produções" route="/wiki">
      <WikiEntityList data={data} />
    </Modal>
  );
}
