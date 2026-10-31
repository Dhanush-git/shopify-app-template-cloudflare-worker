import type { Route } from "./+types/webhooks.compliance";
import { authenticate, sessionStorage } from "../shopify.server";

export async function action({ request }: Route.ActionArgs) {
  const { topic, shop } = await authenticate.webhook(request);

  switch (String(topic).toUpperCase().replace(/\//g, "_")) {
    case "CUSTOMERS_DATA_REQUEST":
      // You store no customer data → nothing to send
      break;

    case "CUSTOMERS_REDACT":
      // You store no customer data → nothing to delete
      break;

    case "SHOP_REDACT": {
      // Sent 48h after uninstall → delete everything for this shop
      const sessions = await sessionStorage.findSessionsByShop(shop);
      await sessionStorage.deleteSessions(sessions.map((s) => s.id));
      // Later: delete this shop's rows from your own tables here too
      break;
    }
  }

  return new Response();
}