import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PromotionalBanner() {
  return (
    <div className="bg-primary text-primary-foreground border-b border-border/20">
      <div className="container mx-auto px-4 py-3 max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Badge
              variant="secondary"
              className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
            >
              🎉 Limited Time
            </Badge>
            <div className="flex-1 min-w-0">
              <p className="text-sm  truncate">
                <span className="">50% OFF</span> all premium products this
                weekend! Use code{" "}
                <span className="font-mono bg-primary-foreground/10 px-1.5 py-0.5 rounded text-xs">
                  SAVE50
                </span>{" "}
                <span className="hidden sm:inline">at checkout</span>
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 hidden md:flex"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}
