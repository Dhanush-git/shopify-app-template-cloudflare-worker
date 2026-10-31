import type { Route } from "./+types/app._index";
import { authenticate } from "../shopify.server";

export async function loader({ request }: Route.LoaderArgs) {
  const { admin, session } = await authenticate.admin(request);

  const response = await admin.graphql(`#graphql
    query { shop { name } }
  `);
  const { data } = await response.json();

  return {
    shop: session.shop,
    name: data?.shop?.name as string | undefined,
  };
}

export default function AppHome({ loaderData }: Route.ComponentProps) {
  return (
    <s-page heading="Shopify app template">
      <s-text>Connected to {loaderData.name} ({loaderData.shop})</s-text>
    </s-page>
  );
}