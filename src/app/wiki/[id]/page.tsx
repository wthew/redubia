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
import DubbingCast from "@/components/pages/wiki/entity-page/dubbing-cast-prefetch";

type Params = Promise<{ id: string }>;
export default async function PageById(props: { params: Params }) {
  const { id } = await props.params;
  const data = await getWikiEntityById({ id });
  const { name, summary, categories, cover_url, namespace } = data;

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
          <DubbingCast id={id} namespace={namespace!} />
        </CardContent>
      </HandlerAppBarHides>
    </div>
  );
}
