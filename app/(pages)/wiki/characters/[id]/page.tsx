import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { HandlerAppBarHides } from "../../../../components/app-bar/context";
import Categories from "../../../../components/category-badge";
import Markdown from "react-markdown";
import { getCharacterById } from "@/lib/services/gen";
import Image from "next/image";
import Link from "next/link";
import { PLACEHOLDER_IMAGE } from "@/utils";

type Params = Promise<{ id: string }>;
export default async function PageById(props: { params: Params }) {
  const { id } = await props.params;
  const data = await getCharacterById({ id });

  return (
    <div className="flex justify-center items-center md:p-8">
      <div className="fixed top-0 left-0 z-0 max-h-screen overflow-hidden blur-sm">
        <Image
          alt=""
          className="w-screen blur-xl brightness-50"
          src={{
            src: data.cover_url || PLACEHOLDER_IMAGE,
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
                src: data.cover_url || PLACEHOLDER_IMAGE,
                width: 128,
                height: 128,
              }}
            />
          </div>
          <CardHeader className="h-full w-4/5 p-2">
            <CardTitle className="flex justify-start gap-2 items-center">
              <h1 className="text-2xl self-baseline">{data.name}</h1>
            </CardTitle>
            <CardDescription>
              <Categories categories={data.categories || []} />
            </CardDescription>
            {/* <Gallery page_id={id} /> */}
          </CardHeader>
        </div>
        <CardContent className="">
          <Markdown className="mt-3">{"data.description"}</Markdown>
          {data.dubbing_cast?.map(({ watchable, voice_actor }, idx) => {
            return (
              <div key={idx} className="flex flex-col gap-2">
                <CardHeader className="flex flex-row gap-4 items-center">
                  <div className="w-16 h-16 relative">
                    <Image
                      alt={voice_actor?.name || ""}
                      src={{
                        src: voice_actor?.cover_url || PLACEHOLDER_IMAGE,
                        width: 64,
                        height: 64,
                      }}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/wiki/voice_actors/${voice_actor?.id}`}>
                      <span className="text-lg font-semibold">
                        {voice_actor?.name}
                      </span>
                    </Link>
                    <Link href={`/wiki/watchables/${watchable?.id}`}>
                      <span className="text-sm text-gray-500">
                        {watchable?.name}
                      </span>
                    </Link>
                  </div>
                </CardHeader>
              </div>
            );
          })}
        </CardContent>
      </HandlerAppBarHides>
    </div>
  );
}
