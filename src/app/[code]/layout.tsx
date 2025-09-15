import { encryptFlagValues } from "flags";
import { deserialize, generatePermutations } from "flags/next";
import { FlagValues } from "flags/react";
import { DevTools } from "@/components/dev-tools";
import { Navbar } from "@/components/navbar";
import { flags } from "@/flags";

// Ensure the page is static
export const dynamic = "error";

// Generate all permutations (all combinations of flag 1 and flag 2).
export async function generateStaticParams() {
  const permutations = await generatePermutations(flags);
  return permutations.map((code) => ({ code }));
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}>) {
  const { code } = await params;
  const values = await deserialize(flags, code);
  const encryptedFlagValues = await encryptFlagValues(values);

  return (
    <>
      <Navbar />
      {children}
      <FlagValues values={encryptedFlagValues} />
      <DevTools />
    </>
  );
}
