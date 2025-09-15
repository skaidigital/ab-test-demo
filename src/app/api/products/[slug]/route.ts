import { type NextRequest, NextResponse } from "next/server";
import { getProductBySlug, type Product } from "@/data/products";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // Simulate network delay for testing
  await new Promise((resolve) => setTimeout(resolve, 100));

  const product: Product | undefined = getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
