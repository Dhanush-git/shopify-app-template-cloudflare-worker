import { redirect } from "react-router";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shopify app" },
    { name: "description", content: "Shopify app on Cloudflare Workers" },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams}`);
  }
  return null;
}
