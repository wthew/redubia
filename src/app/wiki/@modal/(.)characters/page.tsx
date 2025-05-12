import Modal from "@/components/modal";
import WikiEntityList from "@/components/pages/wiki/prefetch-items";

export default async function Page() {    
    return <Modal title="Personagens" route="/wiki">
        <WikiEntityList query="characters" />
    </Modal>
}