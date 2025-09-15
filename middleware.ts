import { precompute } from "flags/next";
import { type NextRequest, NextResponse } from "next/server";
import { getStableId } from "@/features/ab-test/get-stable-id";
import { productFlags } from "@/flags";

export const config = {
  matcher: ["/", "/cart"],
};

export async function middleware(request: NextRequest) {
  console.log("middleware");

  const stableId = await getStableId();
  console.log("stableId", stableId);
  const code = await precompute(productFlags);
  console.log("code", code);

  // rewrites the request to the variant for this flag combination
  const nextUrl = new URL(
    `/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
    request.url,
  );
  console.log("nextUrl", nextUrl);
  if (stableId.isFresh) {
    request.headers.set("x-generated-stable-id", stableId.value);
  }
  console.log("request.headers", request.headers);
  // response headers
  const headers = new Headers();
  headers.append("set-cookie", `stable-id=${stableId.value}`);
  console.log("headers", headers);
  return NextResponse.rewrite(nextUrl, { request, headers });
}
