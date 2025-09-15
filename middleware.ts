import { precompute } from "flags/next";
import { type NextRequest, NextResponse } from "next/server";
import { getStableId } from "@/features/ab-test/get-stable-id";
import { productFlags } from "@/flags";
import { COOKIES, HEADERS } from "@/lib/constants";

export async function middleware(request: NextRequest) {
  console.log("[middleware] request", request);

  const stableId = await getStableId();
  console.log("[middleware] getStableId");

  const code = await precompute(productFlags);
  console.log("[middleware] precompute");

  // rewrites the request to the variant for this flag combination
  const nextUrl = new URL(
    `/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
    request.url,
  );
  console.log("[middleware] nextUrl", nextUrl);

  if (stableId.isFresh) {
    request.headers.set(HEADERS.STABLE_ID, stableId.value);
  }

  // response headers
  const headers = new Headers();
  headers.append("set-cookie", `${COOKIES.STABLE_ID}=${stableId.value}`);
  return NextResponse.rewrite(nextUrl, { request, headers });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/ (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _axiom/ (Axiom logging)
     * - favicon.ico (favicon file)
     * - bloom-filter.json (our bloom filter data)
     * - files with extensions (images, js, css, etc.)
     */
    "/((?!api/|_next/static|_next/image|_axiom/|favicon.ico|bloom-filter.json|.*\\.).+)",
  ],
};
