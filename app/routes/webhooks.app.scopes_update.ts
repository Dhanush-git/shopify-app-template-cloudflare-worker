import type { Route } from "./+types/webhooks.app.scopes_update";
import { authenticate, sessionStorage } from "../shopify.server";

export async function action({ request }: Route.ActionArgs) {
  const { payload, session } = await authenticate.webhook(request);
  const current = (payload as { current?: string[] }).current;

  if (session && current) {
    session.scope = current.join(",");
    await sessionStorage.storeSession(session);
  }

  return new Response();
}