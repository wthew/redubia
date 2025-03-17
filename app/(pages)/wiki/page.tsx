import Image from "@/components/image";
import { getPopularPages } from "@/lib/services/gen";
import Link from "next/link";


export default async function Page() {
  const popular = await getPopularPages();

  return (
    <div className="text-gray-100 min-h-screen font-sans">
      {/* Hero Section com Gradiente Animado */}
      <div className="relative py-24 flex items-center justify-center overflow-hidden">
        {/* Conteúdo da Hero Section */}
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">wiki</h1>
          <p className="text-lg text-gray-200 mb-8">
            Explore o maior acervo sobre dublagem. Descubra vozes, personagens e
            curiosidades que marcaram gerações.
          </p>
          <input
            type="text"
            placeholder="Busque por dublador, personagem ou animação..."
            className="w-2/3 md:w-full max-w-md p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Resto da Página */}
      <div className="p-8">
        {/* Seção de Destaques */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-400 mb-6">
            Destaques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popular.map(({ id, ns, title, description, thumbnail }) => {
              return (
                <Link key={id} title={description} href={`/wiki/${ns}/${id}`}>
                  <div className="relative flex flex-col p-6 rounded-lg cursor-pointer overflow-hidden">
                    <h3 className="z-10 pointer-events-none text-xl font-bold text-white">
                      {title}
                    </h3>
                    <p className="z-10 pointer-events-none text-gray-300 truncate mt-2">
                      {description}
                    </p>
                    <div className="absolute transition-all w-full h-full left-0 top-0 brightness-25 blur-sm hover:brightness-40 hover:blur-xs">
                      <Image
                        alt=""
                        image={thumbnail}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Seção de Categorias */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-6">
            Explore por Categoria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Categoria 1 */}
            <Link href="/wiki/dubladores">
              <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold text-white">Dubladores</h3>
                <p className="text-gray-400 mt-2">
                  Conheça os talentos por trás das vozes.
                </p>
              </div>
            </Link>
            {/* Categoria 2 */}
            <Link href="/wiki/personagens">
              <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold text-white">Personagens</h3>
                <p className="text-gray-400 mt-2">
                  Descubra quem são os personagens icônicos.
                </p>
              </div>
            </Link>
            {/* Categoria 3 */}
            <Link href="/wiki/filmes">
              <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold text-white">Filmes</h3>
                <p className="text-gray-400 mt-2">
                  Explore os elencos de dublagem dos filmes.
                </p>
              </div>
            </Link>
            {/* Categoria 4 */}
            <Link href="/wiki/curiosidades">
              <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold text-white">Curiosidades</h3>
                <p className="text-gray-400 mt-2">
                  Mergulhe em fatos interessantes sobre a dublagem.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
