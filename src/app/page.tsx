import { precompute } from "flags/next";
import { redirect } from "next/navigation";
import { flags } from "@/flags";

export default async function RootPage() {
  const code = await precompute(flags);
  redirect(`/${code}`);
}
