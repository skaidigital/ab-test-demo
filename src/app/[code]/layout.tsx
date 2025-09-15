import { encryptFlagValues } from "flags";
import { deserialize, generatePermutations } from "flags/next";
import { FlagValues } from "flags/react";
import { DevTools } from "@/components/dev-tools";
import { Navbar } from "@/components/navbar";
import { flags } from "@/flags";

export async function generateStaticParams() {
  // Returning an empty array here is important as it enables ISR, so
  // the various combinations stay cached after they first time they were rendered.
  //
  // return [];

  // Instead of returning an empty array you could also call generatePermutations
  // to generate the permutations upfront.
  const codes = await generatePermutations(flags);
  console.log("codes", codes);
  return codes.map((code) => ({ code }));
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
