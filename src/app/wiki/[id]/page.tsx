import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { HandlerAppBarHides } from "../../../components/app-bar/context";
import Categories from "../../../components/category-badge";
import Markdown from "react-markdown";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/utils";
import { getWikiEntityById } from "@/lib/services/gen";

type Params = Promise<{ id: string }>;
export default async function PageById(props: { params: Params }) {
  const { id } = await props.params;
  const data = await getWikiEntityById({ id });
  const { name, summary, categories, cover_url } = data;

  return (
    <div className="flex justify-center items-center md:p-8">
      <div className="fixed top-0 left-0 z-0 max-h-screen overflow-hidden blur-sm">
        <Image
          alt=""
          className="w-screen blur-xl brightness-50"
          src={{
            src: cover_url || PLACEHOLDER_IMAGE,
            width: 100,
            height: 100,
          }}
        />
      </div>
      <HandlerAppBarHides>
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
            {/* <Gallery page_id={id} /> */}
          </CardHeader>
        </div>
        <CardContent className="">
          <Markdown className="mt-3">{summary}</Markdown>
          {/* {dubbing_cast?.map(({ character, voice_actors }, idx) => {
            return (
              <div key={idx} className="flex flex-col gap-2">
                <CardHeader className="flex flex-row gap-4 items-center">
                  <div className="w-16 h-16 relative">
                    <Image
                      style={{ width: 64, height: 64, objectFit: "cover" }}
                      alt={character?.name || ""}
                      src={{
                        src: character?.cover_url || PLACEHOLDER_IMAGE,
                        width: 64,
                        height: 64,
                      }}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/wiki/characters/${character?.id}`}>
                      <span className="text-lg font-semibold">
                        {character?.name}
                      </span>
                    </Link>

                    <div className="flex gap-2">
                      {voice_actors?.map(({ id, name }, idx, { length }) => (
                        <Link href={`/wiki/voice-actors/${id}`}>
                          <span className="text-sm text-gray-500">
                            {name}
                            {length - 1 > idx ? ", " : ""}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardHeader>
              </div>
            );
          })} */}
        </CardContent>
      </HandlerAppBarHides>
    </div>
  );
}
