import callApi from "./services/api";
import { ImageResponse } from "./types/api";

export default function fetchGallery(page_id: string) {
  return callApi(`/gallery/${page_id}?size=64`, async (response) => {
    return response.json() as unknown as ImageResponse[];
  });
}
