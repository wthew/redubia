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

type Params = Promise<{ id: string }>;
export default async function PageById(props: { params: Params }) {
  const { id } = await props.params;

  const response = await callApi(`/page/${id}`, (response) => {
    return response.json();
  });
  console.log("fetched", response.title);

  return (
    <div className="flex justify-center items-center h-dvh md:p-8">
      <Card className="rounded-none md:rounded-lg w-full max-w-3xl">
        <CardHeader>
          <CardTitle>{response.title}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Gallery page_id={id} />
          <p>{response.summary}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
