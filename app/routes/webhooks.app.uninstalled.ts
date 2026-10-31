import type { Route } from "./+types/webhooks.app.uninstalled";
import { authenticate, sessionStorage } from "../shopify.server";

export async function action({ request }: Route.ActionArgs) {
  const { shop, session } = await authenticate.webhook(request);

  if (session) {
    const sessions = await sessionStorage.findSessionsByShop(shop);
    await sessionStorage.deleteSessions(sessions.map((s) => s.id));
  }

  return new Response();
}