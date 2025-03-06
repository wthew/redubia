import MediaWikiCard from "@/components/media-wiki-card";
import { getPopularPages } from "@/lib/services/gen";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const popular = await getPopularPages();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h5 className="text-lg mb-2">Paginas populares:</h5>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {popular.map((page) => (
            <MediaWikiCard key={page.id} item={page} />
          ))}
        </div>
      </div>
    </main>
  );
}
