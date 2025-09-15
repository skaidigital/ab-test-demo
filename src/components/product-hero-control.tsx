import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

interface ProductHeroControlProps {
  product: Product;
  isOnSale: boolean;
  discountPercentage: number;
}

export function ProductHeroControl({
  product,
  isOnSale,
  discountPercentage,
}: ProductHeroControlProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Image Section */}
      <div className="space-y-4">
        <div
          className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center"
          style={{ backgroundColor: product.color }}
        >
          <div className="text-center text-white">
            <div className="text-6xl font-bold opacity-20 mb-2">
              {product.name.charAt(0)}
            </div>
            <div className="text-sm opacity-75">Product Image</div>
          </div>
        </div>

        {/* Additional image placeholders */}
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`image-${product.id}-${index}`}
              className="aspect-square rounded-md border border-muted-foreground/25 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
              style={{ backgroundColor: `${product.color}20` }}
            >
              <div className="text-xs text-muted-foreground">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{product.category}</Badge>
            {isOnSale && (
              <Badge variant="destructive">-{discountPercentage}% OFF</Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground text-lg">{product.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={`star-${product.id}-${index}`}
                className={`w-5 h-5 ${
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
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {isOnSale && (
            <span className="text-xl text-muted-foreground line-through">
              ${product.originalPrice?.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <Alert
          className={
            product.inStock
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }
        >
          <AlertTitle
            className={product.inStock ? "text-green-800" : "text-red-800"}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </AlertTitle>
          <AlertDescription
            className={product.inStock ? "text-green-700" : "text-red-700"}
          >
            {product.inStock
              ? "Available for immediate shipping"
              : "This item is currently out of stock"}
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button size="lg" className="flex-1" disabled={!product.inStock}>
            {product.inStock ? "Add to Cart" : "Notify When Available"}
          </Button>
          <Button variant="outline" size="lg">
            Add to Wishlist
          </Button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
