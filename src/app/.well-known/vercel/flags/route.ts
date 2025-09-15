import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";
import * as flags from "@/features/ab-test/flags";

export const GET = createFlagsDiscoveryEndpoint(async (_request) => {
  const providerData = getProviderData(flags);
  return providerData;
});
