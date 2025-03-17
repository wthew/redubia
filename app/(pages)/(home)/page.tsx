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

export default async function Home() {
  return (
    <div className="text-gray-400 bg-black font-sans flex flex-col">
      <div className="w-full h-full text-center p-4">
        <p className="px-8 text-lg mt-4 text-left">
          Uma plataforma moderna criada para entusiastas e profissionais da
          dublagem. Embarque no universo da dublagem e descubra as vozes que dão
          vida aos seus personagens favoritos. Conheça dubladores e curiosidades
          do mundo das animações e filmes.
        </p>

        <div className="mt-8 flex flex-col">
          <Section
            title="Wiki da Dublagem"
            description="Explore o maior acervo sobre dublagem. Descubra quem deu voz a personagens inesquecíveis, quantos dubladores interpretaram seu ator favorito no Brasil e mergulhe nos elencos de filmes e séries que marcaram gerações. Tudo organizado e ao seu alcance!"
            action={{ label: "Explorar", link: "/wiki" }}
          />
          <Section
            title="IA que Reconhece Vozes"
            description="Grave e descubra qual dublador está por trás da voz com nossa tecnologia de Inteligência Artificial. Com alta precisão e resultados confiáveis, você pode explorar detalhes sobre as vozes que marcaram seus personagens favoritos. Tudo isso de forma rápida, moderna e ao seu alcance"
            action={{ label: "Testar", link: "/discover", disabled: true }}
          >
            <Section.Background>
              <SounWavesEffect />
            </Section.Background>
          </Section>
          <Section
            title="API para Desenvolvedores"
            description="Integre dados de dubladores, personagens e animações em seus projetos usando nossa API robusta, intuitiva e fácil de implementar. Perfeito para desenvolvedores que buscam acesso a informações detalhadas e organizadas sobre o mundo da dublagem"
            action={{ label: "Ver preços", link: "/pricing", disabled: true }}
          >
            <Section.Background>
              <MatrixEffect />
            </Section.Background>
          </Section>
          <Section
            title="Quem é a Voz"
            description="Teste seus conhecimentos no nosso jogo de perguntas e respostas: descubra a voz por trás de personagens icônicos e ganhe créditos! Divirta-se enquanto aprende curiosidades sobre dubladores e suas interpretações marcantes. Será que você consegue acertar todas?"
            action={{ label: "Experimentar", link: "/quiz", disabled: true }}
          >
            <Section.Background>
              <RetroEffect />
            </Section.Background>
          </Section>
        </div>
      </div>
      <div className={clsx(style["wrap"])}>
        {icons.map((Svg, idx) => {
          return <Svg key={idx} className={clsx(style["svg"])} />;
        })}
      </div>
      <footer className="w-full text-center py-6 text-gray-500 text-sm">
        <p>
          Feito com muito ☕ por{" "}
          <a
            className="underline"
            target="_blank"
            href="https://wthew.vercel.app"
          >
            thw
          </a>
        </p>
      </footer>
    </div>
  );
}
