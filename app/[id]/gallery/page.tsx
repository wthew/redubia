"use client";

import GalleryModal from "@/app/components/Gallery/modal";
import { useParams, useRouter } from "next/navigation";

export default function ModalGallery() {
  const router = useRouter();
  const { id } = useParams();

  return <GalleryModal id={id as string} onClose={() => router.push(`/${id}`)} />;
}