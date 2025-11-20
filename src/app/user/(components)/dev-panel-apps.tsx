import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type App = {
  id: string;
  name: string;
  client_id: string;
  redirect_uris: string[];
  scopes: string[];
  status: "active" | "inactive";
};

const mock: App[] = [
  {
    id: "1",
    name: "App One",
    client_id: "client_1",
    redirect_uris: ["https://appone.com/callback"],
    scopes: ["read", "write"],
    status: "active",
  },
  {
    id: "2",
    name: "App Two",
    client_id: "client_2",
    redirect_uris: ["https://apptwo.com/callback"],
    scopes: ["read"],
    status: "inactive",
  },
  {
    id: "3",
    name: "App Three",
    client_id: "client_3",
    redirect_uris: ["https://appthree.com/callback"],
    scopes: ["write"],
    status: "active",
  },
];

export default function DevPanelApps() {
  return (
    <div>
      <div className="flex flex-row gap-4">
        {mock.map((app) => (
          <Card key={app.id}>
            <CardHeader>
              <CardTitle>{app.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Client ID:</strong> {app.client_id}
              </p>
              <p>
                <strong>Redirect URIs:</strong> {app.redirect_uris.join(", ")}
              </p>
              <p>
                <strong>Scopes:</strong> {app.scopes.join(", ")}
              </p>
              <p>
                <strong>Status:</strong> {app.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link href="/user/dev-panel/create-application" className="self-start">
        Criar
      </Link>
    </div>
  );
}
