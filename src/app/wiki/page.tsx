import WikiPage from "@/components/wiki";
import { getFeaturedWikiEntities } from "@/lib/services/gen";

export default async function () {
  // const featured = await getFeaturedWikiEntities()
  return <WikiPage featured={[]} />
}