"use client";

import { Button } from "@/components/ui/button";
import { COOKIES } from "@/lib/constants";

export function DevTools() {
  return (
    <div className="fixed bottom-4 right-4">
      <Button
        type="button"
        onClick={() => {
          // biome-ignore lint/suspicious/noDocumentCookie: Vercel did it so can I too
          document.cookie = `${COOKIES.VISITOR_ID}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          window.location.reload();
        }}
        variant="outline"
      >
        Regenerate random visitor id
      </Button>
    </div>
  );
}
