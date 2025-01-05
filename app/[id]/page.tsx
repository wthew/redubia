import callApi from "../services/api";

type Params = Promise<{ id: string }>;
export default async function PageById(props: { params: Params }) {
  const { id } = await props.params;
  const response = await callApi(`/page/${id}`, (response) => {
    console.log("fetched");
    return response.json();
  });

  return (
    <>
      {response.summary}
      {response.images}
      <div dangerouslySetInnerHTML={{ __html: response.table }} />
    </>
  );
}
