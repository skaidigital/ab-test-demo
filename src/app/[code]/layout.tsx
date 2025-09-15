import { encryptFlagValues } from "flags";
import { deserialize, generatePermutations } from "flags/next";
import { FlagValues } from "flags/react";
import { DevTools } from "@/components/dev-tools";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { flags, showTestVariant } from "@/features/ab-test/flags";
import { getDefaultCode } from "@/features/ab-test/get-default-code";
import { AB_TEST_CONFIG } from "@/lib/constants";

export async function generateStaticParams() {
  if (!AB_TEST_CONFIG.ENABLED) {
    const defaultCode = await getDefaultCode();

    return [{ code: defaultCode }];
  }

  const codes = await generatePermutations(flags);
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
  const abTestIsActive = await showTestVariant(code, flags);

  return (
    <>
      <Navbar abTestIsActive={abTestIsActive} />
      {children}
      <Footer />
      <FlagValues values={encryptedFlagValues} />
      <DevTools />
    </>
  );
}
