import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Categories from "../../../components/category-badge";
import Markdown from "react-markdown";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/utils";
import {
  DubbingCastFromCharacter,
  DubbingCastFromVoiceActor,
  DubbingCastFromWatchable,
  getDubbingCastByCharacterId,
  getDubbingCastByVoiceActorId,
  getDubbingCastByWatchableId,
  getWikiEntityById,
} from "@/lib/services/gen";
import Link from "next/link";
import Gallery from "@/components/gallery";

type Params = Promise<{ id: string }>;
export default async function PageById(props: { params: Params }) {
  const { id } = await props.params;
  const data = await getWikiEntityById({ id });
  const { name, summary, categories, cover_url, namespace } = data;

  let dubbing_cast: DubbingCastProps[] = [];

  switch (namespace) {
    case "character":
      dubbing_cast = await getDubbingCastByCharacterId({ id }).then(
        ({ data = [] }) => data as DubbingCastFromCharacter[],
      );
      break;
    case "voice_actor":
      dubbing_cast = await getDubbingCastByVoiceActorId({ id }).then(
        ({ data = [] }) => data as DubbingCastFromVoiceActor[],
      );
      break;
    case "watchable":
      dubbing_cast = await getDubbingCastByWatchableId({ id }).then(
        ({ data = [] }) => data as DubbingCastFromWatchable[],
      );
      break;

    default:
      break;
  }

  return (
    <div className="flex justify-center items-center md:p-8">
      <div className="fixed top-0 left-0 z-0 max-h-screen overflow-hidden blur-sm">
        <Image
          alt=""
          className="h-screen min-w-screen blur-xl brightness-50 object-cover"
          src={{
            src: cover_url || PLACEHOLDER_IMAGE,
            width: 100,
            height: 100,
          }}
        />
      </div>
      <div className="flex flex-col w-screen z-10 justify-center items-center min-h-dvh h-auto">
        <Card
          className={`border-0 md:border-1 rounded-none h-full md:rounded-lg w-full max-w-5xl`}
        >
          <div className="p-6 pb-0 flex flex-row justify-between">
            <div className="rounded-md w-fit m-3 overflow-hidden">
              <Image
                alt=""
                src={{
                  src: cover_url || PLACEHOLDER_IMAGE,
                  width: 128,
                  height: 128,
                }}
              />
            </div>
            <CardHeader className="h-full w-4/5 p-2">
              <CardTitle className="flex justify-start gap-2 items-center">
                <h1 className="text-2xl self-baseline">{name}</h1>
              </CardTitle>
              <CardDescription>
                <Categories categories={categories || []} />
              </CardDescription>
              <Gallery entity_id={id} />
            </CardHeader>
          </div>
          <CardContent className="">
            <Markdown className="mt-3">{summary}</Markdown>
            {dubbing_cast?.map((props) => (
              <DubbinCastBase key={props.id} {...props} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type DubbingCastProps =
  | DubbingCastFromCharacter
  | DubbingCastFromVoiceActor
  | DubbingCastFromWatchable;

function DubbinCastBase(props: DubbingCastProps) {
  const { id, cover_url, characters, watchable, name } = props;

  return (
    <div className="flex flex-col gap-2">
      <CardHeader className="flex flex-row gap-4 items-center">
        <div className="w-16 h-16 relative">
          <Image
            style={{ width: 64, height: 64, objectFit: "cover" }}
            alt={name || ""}
            src={{
              src: cover_url || PLACEHOLDER_IMAGE,
              width: 64,
              height: 64,
            }}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <Link href={`/wiki/${id}`}>
            <span className="text-lg font-semibold">{name}</span>
          </Link>

          <div className="flex gap-2">
            {/*{voice_actor && (
              <Link href={`/wiki/${voice_actor.id}`}>
                <span className="text-sm text-gray-500">
                  {voice_actor.name}
                </span>
              </Link>
            )}*/}
          </div>
        </div>
      </CardHeader>
    </div>
  );
}
