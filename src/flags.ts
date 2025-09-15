/** biome-ignore-all lint/style/noNonNullAssertion: yolo */

import type { ReadonlyHeaders, ReadonlyRequestCookies } from "flags";
import { dedupe, flag } from "flags/next";
import { xxHash32 } from "js-xxhash";
import { getOrGenerateVisitorId } from "@/features/ab-test/get-or-generate-visitor-id";

/**
 * Takes a string and puts it into a bucket.
 *
 * Typically the key consists of the experiment name and the stableId, such that
 * every experiment has a different outcome. If it would depend on the stableId only,
 * then a user would consistently get assigned the same bucket for all experiments,
 * which we need to avoid.
 *
 * @param key - The key to hash.
 * @param buckets - The number of buckets to use.
 * @returns The determined bucket number.
 */
function bucket(key: string, buckets: number = 2) {
  const hashNum = xxHash32(key);
  return hashNum % buckets;
}

interface Entities {
  visitor?: { id: string };
}

const identify = dedupe(
  async ({
    cookies,
    headers,
  }: {
    cookies: ReadonlyRequestCookies;
    headers: ReadonlyHeaders;
  }): Promise<Entities> => {
    const visitorId = await getOrGenerateVisitorId(cookies, headers);
    return { visitor: visitorId ? { id: visitorId } : undefined };
  },
);

export const hasAbTestVariant = flag<boolean, Entities>({
  key: "has-ab-test-variant",
  identify,
  description: "Has AB Test Variant",
  decide({ entities }) {
    if (!entities || !entities.visitor) return this.defaultValue!;
    return bucket(`${this.key}/${entities.visitor.id}`) === 1;
  },
});

export const flags = [hasAbTestVariant];
