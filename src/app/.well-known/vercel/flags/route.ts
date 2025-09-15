import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";
import * as flags from "@/flags";

export const GET = createFlagsDiscoveryEndpoint(async (_request) => {
  const providerData = getProviderData(flags);
  return providerData;
});
