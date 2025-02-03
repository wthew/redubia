import Gallery from "../components/Gallery";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Image from "next/image";
import { HandlerAppBarHides } from "../components/AppBar/context";
import { getDetails } from "../lib/services/gen";

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
          <CardHeader className="h-full p-0">
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>TODO: categorias</CardDescription>
            <Gallery page_id={id} />
          </CardHeader>
          <div className="rounded-md w-1/5 m-3 max-h-32 overflow-hidden">
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
          <p>{data.summary}</p>
        </CardContent>
      </HandlerAppBarHides>
    </div>
  );
}
