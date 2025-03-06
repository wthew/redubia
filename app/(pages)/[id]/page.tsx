import Gallery from "../../components/gallery";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Image from "../../components/image";
import { HandlerAppBarHides } from "../../components/app-bar/context";
import Categories from "../../components/category-badge";
import Markdown from "react-markdown";
import { getArticleById } from "@/lib/services/gen";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Params = Promise<{ id: number }>;
export default async function PageById(props: { params: Params }) {
  const { id } = await props.params;
  const data = await getArticleById({ id });

  return (
    <div className="flex justify-center items-center md:p-8">
      <div className="fixed top-0 left-0 z-0 max-h-screen overflow-hidden blur-sm">
        <Image
          alt=""
          className="w-screen blur-xl brightness-50"
          image={data.cover?.original!}
        />
      </div>
      <HandlerAppBarHides>
        <div className="p-6 pb-0 flex flex-row justify-between">
          <div className="rounded-md w-1/5 m-3 overflow-hidden">
            <Image alt="" image={data.cover?.original!} />
          </div>
          <CardHeader className="h-full w-4/5 p-2">
            <CardTitle className="flex justify-start gap-2 items-center">
              <h1 className="text-2xl self-baseline">{data.title}</h1>
              <small className="font-light opacity-25 self-start">#{id}</small>
            </CardTitle>
            <CardDescription>
              <Categories categories={data.categories || []} />
            </CardDescription>
            <Gallery page_id={id} />
          </CardHeader>
        </div>
        <CardContent className="">
          <Markdown className="mt-3">{data.description}</Markdown>
          {data.sections?.map((section: any, idx) => {
            const { lists, title } = section as {
              title: string;
              lists: {
                title: string;
                items: { link: string; text: string }[];
              }[];
            };

            return (
              <Accordion type="multiple">
                <AccordionItem value={`${idx}-${title}`}>
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {lists
                        .map(({ items }) => items.map((i) => <li>{i.text}</li>))
                        .flat()}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </CardContent>
      </HandlerAppBarHides>
    </div>
  );
}
