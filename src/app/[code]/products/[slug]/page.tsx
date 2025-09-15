/** biome-ignore-all lint/suspicious/noArrayIndexKey: yolo */

import { notFound } from "next/navigation";
import { ProductHeroControl } from "@/components/product-hero-control";
import { ProductHeroTest } from "@/components/product-hero-test";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/data/products";
import { flags, showTestVariant } from "@/features/ab-test/flags";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ code: string; slug: string }>;
}) {
  const { code, slug } = await params;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products/${slug}`;

  const response = await fetch(url, {
    headers: {
      "Cache-Control": "max-age=300, stale-while-revalidate=3600",
    },
  });

  if (!response.ok) {
    notFound();
  }

  const product: Product = await response.json();

  const isOnSale =
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;
  const discountPercentage =
    isOnSale && product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const abTestIsActive = await showTestVariant(code, flags);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {abTestIsActive ? (
        <ProductHeroTest
          product={product}
          isOnSale={isOnSale}
          discountPercentage={discountPercentage}
        />
      ) : (
        <ProductHeroControl
          product={product}
          isOnSale={isOnSale}
          discountPercentage={discountPercentage}
        />
      )}

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>About This Product</CardTitle>
          <CardDescription>
            Learn more about the features and specifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.longDescription}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 border-b border-muted"
                >
                  <span className="font-medium text-sm">{key}</span>
                  <span className="text-muted-foreground text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>What our customers are saying</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`review-${product.id}-${index}`} className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {String.fromCharCode(65 + index)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      Customer {index + 1}
                    </span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <svg
                          key={`review-star-${product.id}-${index}-${starIndex}`}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great product! Highly recommended for anyone looking for
                    quality and performance.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Reviews ({product.reviewCount.toLocaleString()})
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
