import { StarIcon } from "lucide-react";
import { DiscoverRandomButton } from "@/components/discover-random-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRandomProduct } from "@/data/products";
import { flags, hasAbTestVariant } from "@/flags";

export default async function Home({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const abTestIsActive = await hasAbTestVariant(code, flags);
  console.log("abTestIsActive", abTestIsActive);

  const featuredProducts = [
    getRandomProduct(),
    getRandomProduct(),
    getRandomProduct(),
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center my-12">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          {abTestIsActive && <Badge variant="secondary">AB Test Active</Badge>}
          <p className="text-lg text-muted-foreground">
            Discover amazing products at great prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <Card
              // biome-ignore lint/suspicious/noArrayIndexKey: yolo
              key={index}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{product?.category}</Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {product?.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {product?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <StarIcon
                        key={`star-${product?.id}-${starIndex}`}
                        className={`w-4 h-4 ${starIndex < Math.floor(product?.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product?.reviewCount?.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ${(product?.price || 0).toFixed(2)}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Explore?</CardTitle>
            <CardDescription className="text-lg">
              Discover our complete collection of premium products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <DiscoverRandomButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
