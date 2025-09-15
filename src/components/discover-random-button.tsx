"use client";

import { Button } from "@/components/ui/button";
import { getRandomProduct } from "@/data/products";
import { ShuffleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function DiscoverRandomButton() {
  const router = useRouter();
  const onClick = () => {
    const random = getRandomProduct();
    router.push(`/products/${random.slug}`);
  };
  return (
    <Button size="lg" className="text-lg px-8 py-6" onClick={onClick}>
      <ShuffleIcon className="w-5 h-5 mr-2" />
      Discover Random Product
    </Button>
  );
}
