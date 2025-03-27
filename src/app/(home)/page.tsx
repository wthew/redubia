import MatrixEffect from "@/components/matrix-effect/index.ts";
import RetroEffect from "@/components/retro-effect";
import Section from "@/components/section";
import SounWavesEffect from "@/components/sound-waves-effect";

import videoCamera from "@/assets/svg/video-camera.svg";
import headphones from "@/assets/svg/headphones.svg";
import videoPlayer from "@/assets/svg/video-player.svg";
import microphone from "@/assets/svg/microphone.svg";
import speaker from "@/assets/svg/speaker.svg";
import videoEditorPlayer from "@/assets/svg/video-editor-player.svg";
import plug from "@/assets/svg/plug.svg";
import microphoneB from "@/assets/svg/microphone-b.svg";
import settings from "@/assets/svg/settings.svg";

import style from "./style.module.scss";
import clsx from "clsx";
import MagicGradientBackground from "@/components/magic-gradient-bg";

const icons = [
  videoCamera,
  headphones,
  videoPlayer,
  microphone,
  speaker,
  videoEditorPlayer,
  plug,
  microphoneB,
  settings,
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans overflow-hidden">
      {/* Hero Section - Preto puro com detalhes luminosos */}
      <div className="relative overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse-slow" />

        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-950 bg-clip-text text-transparent mb-6">
              redubia
            </h1>
            <p className="text-lg text-left text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Uma plataforma moderna criada para entusiastas e profissionais da dublagem. Embarque no universo da dublagem e descubra as vozes que dão vida aos seus personagens favoritos. Conheça dubladores e curiosidades do mundo das animações e filmes.
            </p>
          </div>
        </div>
      </div>

      {/* Seções - Contraste máximo */}
      <div className="max-w-5xl mx-auto pt-24 px-4 space-y-32 pb-32">
        {/* Seção Wiki */}
        <section className="relative">
          <div className="absolute -left-20 top-1/2 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full" />

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent  mb-4">
                <h2 className="text-3xl font-semibold">Wiki de dublagem</h2>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed">
                Explore o maior acervo sobre dublagem. Descubra quem deu voz a personagens inesquecíveis, e explore elencos de filmes e séries que marcaram gerações. Tudo organizado e ao seu alcance!
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:scale-[1.02] transition-transform">
                Explorar - Em breve
              </button>
            </div>
            <div className="flex-1 w-full ">
              <MagicGradientBackground className="hover:border-cyan-500/20">
                <div className="h-80 flex flex-col items-center justify-center p-8 space-y-8">
                  {/* Animação de cards flutuantes */}
                  <div className="relative h-32 w-full max-w-xs">
                    <div className="absolute left-0 top-0 w-24 h-32 bg-gray-900/50 rounded-xl border border-cyan-400/20 transform -rotate-6 animate-float">
                      <div className="p-3">
                        <div className="text-cyan-400 text-lg">🎭</div>
                        <p className="text-xs text-gray-300 mt-2">Personagens</p>
                      </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-4 w-24 h-32 bg-gray-900/50 rounded-xl border border-purple-400/20 animate-float-delayed">
                      <div className="p-3">
                        <div className="text-purple-400 text-lg">🎙️</div>
                        <p className="text-xs text-gray-300 mt-2">Dubladores</p>
                      </div>
                    </div>

                    <div className="absolute right-0 top-0 w-24 h-32 bg-gray-900/50 rounded-xl border border-blue-400/20 transform rotate-6 animate-float">
                      <div className="p-3">
                        <div className="text-blue-400 text-lg">🎬</div>
                        <p className="text-xs text-gray-300 mt-2">Filmes</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Forte */}
                  <div className="text-center space-y-4">
                    <h3 className="text-xl text-gray-200 font-medium">
                      Descubra o Universo da Dublagem
                    </h3>
                    <p className="text-sm text-gray-400 max-w-md mx-auto">
                      Explore biografias e conexões entre todas as vozes cadastradas
                    </p>
                  </div>
                </div>

              </MagicGradientBackground>
            </div>
          </div>
        </section>

        {/* Seção IA */}
        <section className="relative">
          <div className="absolute -right-20 top-1/2 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                <h2 className="text-3xl font-semibold">Quem é esse personagem?</h2>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed">
                Grave e descubra qual dublador está por trás da voz com nossa tecnologia de Inteligência Artificial
              </p>
              <button className="px-6 py-3 border border-gray-800 hover:border-cyan-400/30 rounded-lg font-medium bg-black/50 hover:bg-cyan-500/10 transition-colors">
                Analisar Voz - Em Breve
              </button>
            </div>
            <div className="flex-1 h-80 w-full">
              <MagicGradientBackground className="hover:border-purple-500/20" colors={["rgba(128, 0, 128, 0.3) 0%", "rgba(128, 0, 128, 0.15) 30%"]} >
                <div className="h-80 flex flex-col items-center justify-center p-8 space-y-8">

                  {/* Demonstração da IA */}
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl animate-pulse-slow" />

                    <div className="relative bg-black/50 rounded-xl p-6 border border-gray-800/50">
                      {/* Ondas sonoras animadas */}
                      <div className="flex items-center justify-center gap-1 h-24 mb-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="w-2 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full animate-wave"
                            style={{
                              height: `${Math.random() * 40 + 20}px`,
                              animationDuration: `${(Math.random() * 1) + 0.5}s`

                            }}
                          />
                        ))}
                      </div>

                      {/* Resultado da Análise */}
                      <div className="text-center space-y-2">
                        <p className="text-sm text-gray-400">Voz detectada:</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-medium text-gray-200">Wendel Bezerra</span>
                        </div>
                        <p className="text-xs text-purple-400">92% de correspondência</p>
                      </div>
                    </div>
                  </div>

                </div>
              </MagicGradientBackground>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="absolute -left-20 -top-1/4 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full" />

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent  mb-4">
                <h2 className="text-3xl font-semibold">API para desenvolvedores</h2>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed">
                Integre dados de dubladores, personagens e animações em seus projetos usando nossa API robusta, intuitiva e fácil de implementa
              </p>
              <button className="px-6 py-3 border border-gray-800 hover:border-cyan-400/30 rounded-lg font-medium bg-black/50 hover:bg-cyan-500/10 transition-colors">
                Ver preços - Em beta
              </button>
            </div>
            <div className="flex-1 w-full">
              <MagicGradientBackground className="hover:border-cyan-950">
                <div className="flex flex-col items-center justify-center p-8 space-y-8">
                  <div className="relative w-full max-w-2xl">
                    <div className="bg-black/70 rounded-xl p-6 border border-gray-800/50">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500"></span>
                          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                          <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        </div>
                        <span className="text-sm text-gray-400">Exemplo em JavaScript</span>
                      </div>

                      <pre className="text-sm text-cyan-400 overflow-x-auto">
                        {`fetch('https://api.comming-soon/voice-actors', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  }
})
.then(response => response.json())
.then(data => {
  console.log('Dubladores:', data);
});`}
                      </pre>
                    </div>

                    <div className="absolute -bottom-6 right-4">
                      <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-sm hover:scale-105 transition-transform">
                        Quero fazer parte da beta!
                      </button>
                    </div>
                  </div>

                  {/* CTA e Métricas */}
                  <div className="flex items-center gap-8 mt-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">99.9%</div>
                      <div className="text-xs text-gray-400">Uptime</div>
                    </div>

                    <div className="h-8 w-px bg-gray-700"></div>

                    <div className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">120ms</div>
                      <div className="text-xs text-gray-400">Resposta Média</div>
                    </div>
                  </div>
                </div>
              </MagicGradientBackground>
            </div>
          </div>
        </section>
      </div>

      {/* Footer - Minimalista */}
      <footer className="border-t border-gray-900 py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Feito por{' '}
            <a
              href="https://wthew.vercel.app"
              target="_blank"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              thw
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function QuizCard({ title, description, color = "blue" }: { title: string; description: string; color?: "blue" | "purple" | "cyan" }) {
  const colors = {
    blue: 'border-blue-500/20 hover:border-blue-400/40',
    purple: 'border-purple-500/20 hover:border-purple-400/40',
    cyan: 'border-cyan-500/20 hover:border-cyan-400/40'
  };

  return (
    <div className={`p-8 rounded-2xl border ${colors[color]} bg-black/30 hover:bg-black/50 transition-all`}>
      <h3 className="text-xl font-semibold mb-3 text-gray-200">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <button className={`px-6 py-2 rounded-lg bg-gradient-to-r from-${color}-500 to-${color}-600 hover:to-${color}-500 transition-all`}>
        Jogar
      </button>
    </div>
  );
}
