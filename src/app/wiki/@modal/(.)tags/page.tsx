import Modal from "@/components/modal";
import TagsSelector from "@/components/pages/wiki/tags-selector";

export default async function Page() {
  return (
    <Modal title="Tags" route="/wiki">
      <TagsSelector />
    </Modal>
  );
}
