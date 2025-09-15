import type { NextRequest } from "next/server";
import {
  activeABTestMiddleware,
  inactiveABTestMiddleware,
} from "@/features/ab-test/middleware";
import { AB_TEST_CONFIG } from "@/lib/constants";

export async function middleware(request: NextRequest) {
  if (!AB_TEST_CONFIG.ENABLED) {
    return inactiveABTestMiddleware(request);
  }

  return await activeABTestMiddleware(request);
}

export const config = {
  matcher: ["/", "/products/:path*"],
};
