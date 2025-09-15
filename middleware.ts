import { precompute } from "flags/next";
import { type NextRequest, NextResponse } from "next/server";
import { getStableId } from "@/features/ab-test/get-stable-id";
import { flags } from "@/flags";
import { COOKIES, HEADERS } from "@/lib/constants";

export async function middleware(request: NextRequest) {
  const stableId = await getStableId();

  const code = await precompute(flags);

  // rewrites the request to the variant for this flag combination
  const nextUrl = new URL(
    `/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
    request.url,
  );

  if (stableId.isFresh) {
    request.headers.set(HEADERS.STABLE_ID, stableId.value);
  }

  // response headers
  const headers = new Headers();
  headers.append("set-cookie", `${COOKIES.STABLE_ID}=${stableId.value}`);
  return NextResponse.rewrite(nextUrl, { request, headers });
}

export const config = {
  matcher: ["/", "/products/:path*"],
};
