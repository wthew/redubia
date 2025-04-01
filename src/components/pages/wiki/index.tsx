import { Skeleton } from "@/components/ui/skeleton";
import { WikiEntitySchema } from "@/lib/services/gen";
import { PLACEHOLDER_IMAGE } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  featured?: WikiEntitySchema[];
}
export default async function WikiPage(props: Props) {
  return (
    <div className="bg-black text-gray-100 min-h-screen font-sans">
      <div className="relative overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse-slow" />

        <div className="max-w-6xl mx-auto px-4 pt-24 pb-8 text-center">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              wiki
            </h1>

            <div className="relative group w-fit mx-auto">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-40 group-focus-within:opacity-60 transition-opacity duration-300 blur-md" />

              <div className="relative isolate">
                <input
                  type="text"
                  placeholder="Busque por dublador, personagem ou animação..."
                  className="w-80 md:w-[640px] px-8 py-5 bg-black backdrop-blur-lg border border-gray-700 rounded-2xl text-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all duration-300 group-hover:border-cyan-400/50 pr-20"
                />

                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <div className="relative w-8 h-8">
                    <svg
                      className="w-full h-full text-cyan-400/80 group-hover:text-cyan-300 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                      <path
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        strokeLinecap="round"
                        d="M15.5 15.5l5 5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium text-cyan-400">
              Destaques Recentes
            </h2>
            <a className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              Ver Todos →
            </a>
          </div>

          <div className="flex gap-6 pb-4 overflow-x-auto scroll-smooth hide-scrollbar">
            {!props.featured
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="transition-transform hover:scale-95"
                  >
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  </div>
                ))
              : props.featured.map(({ id, name, cover_url, summary }) => (
                  <Link
                    key={id}
                    href={`/wiki/${id}`}
                    className=" transition-transform hover:scale-95"
                    title={summary}
                  >
                    <div className="group w-64 relative overflow-hidden rounded-2xl border border-gray-800/50 hover:border-cyan-400/30 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/5 opacity-30 group-hover:opacity-50 transition-opacity" />

                      <div className="w-full h-48 relative">
                        <Image
                          alt=""
                          src={cover_url || PLACEHOLDER_IMAGE}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="relative p-6 flex flex-col justify-end">
                        <h3 className="text-xl font-semibold text-gray-200 mb-2 truncate">
                          {name}
                        </h3>
                      </div>

                      <div className="absolute bottom-4 right-4 text-cyan-400/30 group-hover:text-cyan-400/50 transition-colors">
                        {/* icone simbolizando a "namespace" do item */}
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-cyan-400 mb-8">
            Navegar por Categoria
          </h2>

          <div className="flex gap-6 pb-4 overflow-x-auto scroll-smooth hide-scrollbar">
            <Link
              href="/wiki/voice-actors"
              className=" transition-transform hover:scale-95"
            >
              <div className="flex-shrink-0 w-64 p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-cyan-400/30 transition-all group">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  Dubladores
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  Conheça os talentos por trás das vozes icônicas
                </p>
              </div>
            </Link>

            <Link
              href="/wiki/characters"
              className=" transition-transform hover:scale-95"
            >
              <div className="flex-shrink-0 w-64 p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-cyan-400/30 transition-all group">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  Personagens
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  Descubra as vozes por trás dos personagens marcantes
                </p>
              </div>
            </Link>

            <Link
              href="/wiki/watchables"
              className=" transition-transform hover:scale-95"
            >
              <div className="flex-shrink-0 w-64 p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-cyan-400/30 transition-all group">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  Produções
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  Filmes, séries, jogos e animações
                </p>
              </div>
            </Link>

            <Link
              href="/wiki/tags"
              className=" transition-transform hover:scale-95"
            >
              <div className="flex-shrink-0 w-64 p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-cyan-400/30 transition-all group">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  Tags
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  Explore nossa wiki pelas tags da comunidade
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
