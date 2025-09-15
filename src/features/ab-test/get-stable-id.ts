import { dedupe } from "flags/next";
import { nanoid } from "nanoid";
import { cookies, headers } from "next/headers";
import { COOKIES, HEADERS } from "@/lib/constants";

/**
 * Reads the stable id from the cookie or returns a new stable id
 */
export const getStableId = dedupe(async () => {
  const cookiesStore = await cookies();
  const header = await headers();

  const generatedStableId = header.get(HEADERS.STABLE_ID);

  if (generatedStableId) {
    return { value: generatedStableId, isFresh: false };
  }

  const stableId = cookiesStore.get(COOKIES.STABLE_ID)?.value;
  if (!stableId) return { value: nanoid(), isFresh: true };
  return { value: stableId, isFresh: false };
});
