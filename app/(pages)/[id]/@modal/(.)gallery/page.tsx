"use client";

import GalleryModal from "@/components/gallery/modal";
import { useParams, useRouter } from "next/navigation";

export default function ModalGallery() {
  const router = useRouter();
  const { id } = useParams();

  return <GalleryModal id={id as string} onClose={router.back} />;
}
