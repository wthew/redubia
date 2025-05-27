import Modal from "@/components/modal";
import TagsSelector from "@/components/wiki/tags-selector";

export default async function Page() {
  return (
    <Modal title="Tags" route="/wiki">
      <TagsSelector />
    </Modal>
  );
}
