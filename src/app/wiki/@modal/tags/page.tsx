import Modal from "@/components/modal";
import WikiWikiEntityList from "@/components/pages/wiki/namespaces";
import TagsSelector from "@/components/pages/wiki/tags-selector";

export default async function Page() {
  return (
    <Modal title="Tags" route="/wiki" replace>
      <TagsSelector />
      <WikiWikiEntityList data={[]} />
    </Modal>
  );
}
