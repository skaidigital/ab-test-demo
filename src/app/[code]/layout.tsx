import { Navbar } from "@/components/navbar";

// export function generateStaticParams() {
//   return [{ code: "control" }, { code: "test" }];
// }

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
