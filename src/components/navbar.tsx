import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { PromotionalBanner } from "@/components/promotional-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getRandomProduct, products } from "@/data/products";

interface NavbarProps {
  abTestIsActive?: boolean;
}

export function Navbar({ abTestIsActive = false }: NavbarProps) {
  const randomProduct = getRandomProduct();

  // Mock cart items for demonstration
  const cartItems = [
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 2 },
    { ...products[3], quantity: 1 },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-6xl flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden  sm:inline-block">Product Store</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-4 p-6 w-[500px]">
                    <h3 className=" text-lg">Shop by Category</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {products.slice(0, 4).map((product) => (
                        <NavigationMenuLink key={product.id} asChild>
                          <Link
                            href={`/products/${product.slug}`}
                            className="group block space-y-2"
                          >
                            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                              <div
                                className="w-full h-full flex items-center justify-center"
                                style={{ backgroundColor: product.color }}
                              >
                                <div className="text-center p-4">
                                  <h3 className=" text-sm text-white">
                                    {product.name}
                                  </h3>
                                  <p className="text-xs text-white/80 mt-1">
                                    ${product.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm  group-hover:text-primary transition-colors">
                                {product.category}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {product.name}
                              </p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories"
                          className="flex items-center justify-center w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                          View All Categories
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Featured</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-4 p-6 w-[500px]">
                    <div className="grid grid-cols-2 gap-4">
                      {products.slice(0, 4).map((product) => (
                        <NavigationMenuLink key={product.id} asChild>
                          <Link
                            href={`/products/${product.slug}`}
                            className="group block space-y-2"
                          >
                            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                              <div
                                className="w-full h-full flex items-center justify-center"
                                style={{ backgroundColor: product.color }}
                              >
                                <div className="text-center p-4">
                                  <h3 className=" text-sm text-white">
                                    {product.name}
                                  </h3>
                                  <p className="text-xs text-white/80 mt-1">
                                    ${product.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm  group-hover:text-primary transition-colors">
                                {product.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {product.category}
                              </p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/featured"
                          className="flex items-center justify-center w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                          View All Featured Products
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Deals</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-4 p-6 w-[500px]">
                    <h3 className=" text-lg">Special Offers</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {products
                        .filter((p) => p.originalPrice)
                        .slice(0, 4)
                        .map((product) => (
                          <NavigationMenuLink key={product.id} asChild>
                            <Link
                              href={`/products/${product.slug}`}
                              className="group block space-y-2"
                            >
                              <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
                                <div
                                  className="w-full h-full flex items-center justify-center"
                                  style={{ backgroundColor: product.color }}
                                >
                                  <div className="absolute top-2 right-2">
                                    <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">
                                      Save $
                                      {product.originalPrice
                                        ? (
                                            product.originalPrice -
                                            product.price
                                          ).toFixed(0)
                                        : "0"}
                                    </span>
                                  </div>
                                  <div className="text-center p-4">
                                    <h3 className=" text-sm text-white">
                                      {product.name}
                                    </h3>
                                    <div className="mt-2">
                                      <p className="text-lg  text-white">
                                        ${product.price}
                                      </p>
                                      <p className="text-xs text-white/80 line-through">
                                        ${product.originalPrice}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm  group-hover:text-primary transition-colors">
                                  {product.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Limited Time Deal
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                    </div>
                    <div className="border-t pt-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/deals"
                          className="flex items-center justify-center w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                          View All Deals
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <ShoppingCartIcon className="w-4 h-4" />
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}
                    </Badge>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-lg">
                  {abTestIsActive && <PromotionalBanner />}
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <ShoppingCartIcon className="w-5 h-5" />
                      Shopping Cart (
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}{" "}
                      items)
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full">
                    <div className="flex-1 space-y-4 py-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4"
                        >
                          <div
                            className="w-16 h-16 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className=" text-sm truncate">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <MinusIcon className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button variant="outline" size="sm">
                              <PlusIcon className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-4 py-4">
                      <div className="flex justify-between text-lg ">
                        <span>Total:</span>
                        <span>
                          $
                          {cartItems
                            .reduce(
                              (total, item) =>
                                total + item.price * item.quantity,
                              0,
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Button className="w-full">Checkout</Button>
                        <Button variant="outline" className="w-full">
                          Continue Shopping
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
