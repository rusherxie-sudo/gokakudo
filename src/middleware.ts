import { defineMiddleware } from "astro:middleware";
import { SITE_URL } from "./data/site";

const productionOrigin = new URL(SITE_URL);
const workersDevHost = "gokakudo-eisei.rusher-xie.workers.dev";

export const onRequest = defineMiddleware(async ({ request }, next) => {
  const requestUrl = new URL(request.url);
  const isLocal = requestUrl.hostname === "localhost" || requestUrl.hostname === "127.0.0.1";

  if (!isLocal && requestUrl.hostname === workersDevHost) {
    const destination = new URL(`${requestUrl.pathname}${requestUrl.search}`, productionOrigin);
    return Response.redirect(destination.toString(), 301);
  }

  if (!isLocal && requestUrl.protocol !== "https:") {
    const destination = new URL(`${requestUrl.pathname}${requestUrl.search}`, productionOrigin);
    return Response.redirect(destination, 308);
  }

  const response = await next();
  const headers = response.headers;
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://hm.baidu.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://hm.baidu.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://hm.baidu.com; style-src 'self' 'unsafe-inline'",
  );
  if (requestUrl.protocol === "https:") {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  return response;
});
