import { precompute } from "flags/next";
import { type NextRequest, NextResponse } from "next/server";
import { flags } from "@/features/ab-test/flags";
import { getDefaultCode } from "@/features/ab-test/get-default-code";
import { getStableId } from "@/features/ab-test/get-stable-id";
import { COOKIES, HEADERS } from "@/lib/constants";

export async function activeABTestMiddleware(request: NextRequest) {
  const stableId = await getStableId();
  const code = await precompute(flags);
  const nextUrl = new URL(
    `/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
    request.url,
  );

  if (stableId.isFresh) {
    request.headers.set(HEADERS.STABLE_ID, stableId.value);
  }
  const headers = new Headers();
  headers.append("set-cookie", `${COOKIES.STABLE_ID}=${stableId.value}`);
  return NextResponse.rewrite(nextUrl, { request, headers });
}

export async function inactiveABTestMiddleware(request: NextRequest) {
  const defaultCode = await getDefaultCode();
  return NextResponse.rewrite(
    new URL(
      `/${defaultCode}${request.nextUrl.pathname}${request.nextUrl.search}`,
      request.url,
    ),
    { request },
  );
}
