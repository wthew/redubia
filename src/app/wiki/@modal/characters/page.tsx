import Modal from "@/components/modal";
import WikiEntityList, { getData } from "@/components/pages/wiki/namespaces";

export default async function Page() {
  const data = await getData("characters");

  return (
    <Modal title="Personagens" route="/wiki" replace>
      <WikiEntityList data={data} />
    </Modal>
  );
}
