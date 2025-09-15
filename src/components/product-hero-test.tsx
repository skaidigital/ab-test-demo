import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/data/products";

interface ProductHeroTestProps {
  product: Product;
  isOnSale: boolean;
  discountPercentage: number;
}

export function ProductHeroTest({
  product,
  isOnSale,
  discountPercentage,
}: ProductHeroTestProps) {
  return (
    <div className="bg-gradient-to-br from-background to-muted/30 rounded-2xl p-8 border">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Product Image - Large centered */}
        <div className="lg:col-span-1 flex justify-center">
          <div className="relative">
            <div
              className="w-64 h-64 rounded-2xl border-4 border-dashed border-muted-foreground/25 flex items-center justify-center shadow-2xl"
              style={{ backgroundColor: product.color }}
            >
              <div className="text-center text-white">
                <div className="text-8xl font-bold opacity-30 mb-2">
                  {product.name.charAt(0)}
                </div>
                <div className="text-sm opacity-90 font-medium">
                  Premium Product
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 flex flex-col gap-2">
              {isOnSale && (
                <Badge variant="destructive" className="shadow-lg">
                  -{discountPercentage}% OFF
                </Badge>
              )}
              <Badge variant="secondary" className="shadow-lg">
                {product.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Product Details - Card style */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center lg:text-left">
              <CardTitle className="text-4xl font-bold mb-2">
                {product.name}
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Rating & Price Row */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={`star-${product.id}-${index}`}
                        className={`w-6 h-6 ${
                          index < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {product.rating} • {product.reviewCount.toLocaleString()}{" "}
                    reviews
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  {isOnSale && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <Alert
                className={`${
                  product.inStock
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                    : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                } border-2`}
              >
                <AlertTitle
                  className={
                    product.inStock
                      ? "text-green-800 dark:text-green-200"
                      : "text-red-800 dark:text-red-200"
                  }
                >
                  {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                </AlertTitle>
                <AlertDescription
                  className={
                    product.inStock
                      ? "text-green-700 dark:text-green-300"
                      : "text-red-700 dark:text-red-300"
                  }
                >
                  {product.inStock
                    ? "Ready to ship immediately"
                    : "Currently unavailable"}
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1 text-lg py-6"
                  disabled={!product.inStock}
                >
                  {product.inStock
                    ? "🛒 Add to Cart"
                    : "🔔 Notify When Available"}
                </Button>
                <Button variant="outline" size="lg" className="text-lg py-6">
                  ❤️ Wishlist
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-sm px-3 py-1"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Thumbnail images */}
              <div className="flex gap-2 justify-center lg:justify-start pt-4 border-t">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`thumb-${product.id}-${index}`}
                    className="w-16 h-16 rounded-lg border-2 border-muted-foreground/25 flex items-center justify-center cursor-pointer hover:border-primary transition-all hover:scale-105"
                    style={{ backgroundColor: `${product.color}30` }}
                  >
                    <div className="text-xs text-muted-foreground font-bold">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
