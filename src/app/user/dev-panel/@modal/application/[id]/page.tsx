import Modal from "@/components/modal";
import { NextPageProps } from "@/lib/helpers";
import { getApplicationById } from "@/lib/services/gen";
import FormUpdateApplication from "./form";

type Props = NextPageProps<{ id: string }>;
export default async function DevPanelApplicationPage({ params }: Props) {
  const app = await getApplicationById(await params);

  return (
    <Modal route="/user/dev-panel" title={`Editando "${app.name}"`}>
      <FormUpdateApplication application={app} />
    </Modal>
  );
}
