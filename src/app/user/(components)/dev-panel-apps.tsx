import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Application, getDevelopersApplications } from "@/lib/services/gen";
import Link from "next/link";

function DevPanelApp({ app }: { app: Application }) {
  return (
    <Link href={`/user/dev-panel/application/${app.id}`}>
      <Card className="transition-all hover:-translate-y-1">
        <CardHeader className="flex">
          <div className="flex flex-row justify-between w-full items-baseline">
            <CardTitle>{app.name}</CardTitle>
            <strong>disabled</strong>
          </div>
          <strong className="opacity-50">#{app.client_id}</strong>
        </CardHeader>
        <CardContent>
          {app.redirect_uris?.slice(0, 1).map(({ redirect_uri, id }) => (
            <p key={id} className="truncate">
              {redirect_uri}
            </p>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function DevPanelApps() {
  const data = await getDevelopersApplications();

  return (
    <div className="m-4 flex gap-4 flex-col">
      <div className="flex flex-row gap-4">
        {data.map((app) => (
          <DevPanelApp key={app.id} app={app} />
        ))}
      </div>

      <Button asChild variant="ghost" className="w-fit">
        <Link href="/user/dev-panel/create-application">Criar Aplicação</Link>
      </Button>
    </div>
  );
}
