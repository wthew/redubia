import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type App = {
  id: string;
  name: string;
  client_id: string;
  redirect_uris: { id: string; uri: string }[];
  scopes: string[];
  status: "active" | "inactive";
};

const mock: App[] = [
  {
    id: "1",
    name: "App One",
    client_id: "client_1",
    redirect_uris: [{ id: "1", uri: "https://appone.com/callback" }],
    scopes: ["read", "write"],
    status: "active",
  },
  {
    id: "2",
    name: "App Two",
    client_id: "client_2",
    redirect_uris: [{ id: "1", uri: "https://apptwo.com/callback" }],
    scopes: ["read"],
    status: "inactive",
  },
  {
    id: "3",
    name: "App Three",
    client_id: "client_3",
    redirect_uris: [{ id: "1", uri: "https://appthree.com/callback" }],
    scopes: ["write"],
    status: "active",
  },
];

function DevPanelApp({ app }: { app: App }) {
  return (
    <Card className="transition-all hover:-translate-y-1">
      <CardHeader className="flex">
        <div className="flex flex-row justify-between w-full items-baseline">
          <CardTitle>{app.name}</CardTitle>
          <strong>{app.status}</strong>
        </div>
        <strong className="opacity-50">#{app.client_id}</strong>
      </CardHeader>
      <CardContent>
        {app.redirect_uris.slice(0, 1).map(({ uri, id }) => (
          <p key={id} className="truncate">
            {uri}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

export default function DevPanelApps() {
  return (
    <div className="m-4 flex gap-4 flex-col">
      <div className="flex flex-row gap-4">
        {mock.map((app) => (
          <DevPanelApp key={app.id} app={app} />
        ))}
      </div>

      <Button asChild variant="ghost" className="w-fit">
        <Link href="/user/dev-panel/create-application">Criar Aplicação</Link>
      </Button>
    </div>
  );
}
