import Link from "next/link";
import Gallery from "../components/Gallery";
import Sections from "../components/Sections";
import callApi from "../lib/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Image from "next/image";
import { HandlerAppBarHides } from "../components/AppBar/context";

type Params = Promise<{ id: string }>;
export default async function PageById(props: { params: Params }) {
  const { id } = await props.params;

  const response = await callApi(`/page/${id}`, (response) => {
    return response.json();
  });
  console.log("fetched", response.cover);

  return (
    <div className="flex justify-center items-center h-dvh md:p-8">
      <div className="absolute top-0 left-0 z-0 max-h-screen overflow-hidden blur-sm">
        <Image
          alt=""
          className="w-screen blur-xl brightness-50"
          src={{
            src: response.cover.original.source,
            height: response.cover.original.height,
            width: response.cover.original.width,
          }}
        />
      </div>
      <HandlerAppBarHides>
        <div className="p-6 pb-0 flex flex-row justify-between">
          <CardHeader className="h-full p-0">
            <CardTitle>{response.title}</CardTitle>
            <CardDescription>TODO: categorias</CardDescription>
            <Gallery page_id={id} />
          </CardHeader>
          <div className="rounded-md w-1/5 m-3 max-h-32 overflow-hidden">
            <Image
              alt=""
              src={{
                src: response.cover.original.source,
                height: response.cover.original.height,
                width: response.cover.original.width,
              }}
            />
          </div>
        </div>
        <CardContent className="">
          <p>{response.summary}</p>
          <p>{response.summary}</p>
          <p>{response.summary}</p>
          <p>{response.summary}</p>
          <p>{response.summary}</p>
          <p>{response.summary}</p>
          {/* <div dangerouslySetInnerHTML={{ __html: response.table }} /> */}
        </CardContent>
      </HandlerAppBarHides>
    </div>
  );
}
