import Gallery from "../lib/components/gallery";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../lib/components/ui/card";
import Image from "next/image";
import { HandlerAppBarHides } from "../lib/components/app-bar/context";
import { getDetails } from "../lib/services/gen";
import Categories from "../lib/components/category";

type Params = Promise<{ id: number }>;
export default async function PageById(props: { params: Params }) {
  const { id } = await props.params;
  const { data } = await getDetails({ id });

  return (
    <div className="flex justify-center items-center h-dvh md:p-8">
      <div className="absolute top-0 left-0 z-0 max-h-screen overflow-hidden blur-sm">
        <Image
          alt=""
          className="w-screen blur-xl brightness-50"
          src={{
            src: data.cover.original.source,
            height: data.cover.original.height,
            width: data.cover.original.width,
          }}
        />
      </div>
      <HandlerAppBarHides>
        <div className="p-6 pb-0 flex flex-row justify-between">
          <CardHeader className="h-full w-4/5 p-0">
            <CardTitle className="flex justify-between items-center">
              <h1 className="text-2xl">{data.title}</h1>
              <span className="font-light opacity-25">#{id}</span>
            </CardTitle>
            <CardDescription>
              <Categories id={id} />
            </CardDescription>
            <Gallery page_id={id} />
          </CardHeader>
          <div className="rounded-md w-1/5 m-3 overflow-hidden">
            <Image
              alt=""
              src={{
                src: data.cover.original.source,
                height: data.cover.original.height,
                width: data.cover.original.width,
              }}
            />
          </div>
        </div>
        <CardContent className="">
          <p className="mt-3">{data.summary}</p>
        </CardContent>
      </HandlerAppBarHides>
    </div>
  );
}
