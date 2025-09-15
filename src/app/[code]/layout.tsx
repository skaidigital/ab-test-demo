import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";

// export function generateStaticParams() {
//   return [{ code: "control" }, { code: "test" }];
// }

export default async function Layout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
