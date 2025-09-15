import { Button } from "@/components/ui/button";
import { getRandomProduct } from "@/data/products";
import Link from "next/link";

export function Navbar() {
  const randomProduct = getRandomProduct();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-6xl flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Product Store
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/products/${randomProduct.slug}`}>
                  Random Product
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
