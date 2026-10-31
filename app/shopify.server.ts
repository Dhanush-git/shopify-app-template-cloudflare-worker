import "@shopify/shopify-app-react-router/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp
} from "@shopify/shopify-app-react-router/server";
import { env } from "cloudflare:workers";
import {DrizzleSessionStorageSQLite} from '@shopify/shopify-app-session-storage-drizzle';
import { db } from "./db.server";
import * as schema from "../drizzle/schema";

const shopify = shopifyApp({
  apiKey: env.SHOPIFY_API_KEY,
  apiSecretKey: env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October26,
  scopes: env.SCOPES?.split(","),
  appUrl: env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new DrizzleSessionStorageSQLite(db, schema.sessionTable),
  distribution: AppDistribution.AppStore,
  future: {
    expiringOfflineAccessTokens: true,
  }
});

export default shopify;
export const apiVersion = ApiVersion.October26;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;