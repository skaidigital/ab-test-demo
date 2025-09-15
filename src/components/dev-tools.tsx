"use client";

import { useRouter } from "next/navigation";
import { COOKIES } from "@/lib/constants";

export function DevTools() {
  const router = useRouter();

  const deleteCookie = () => {
    // biome-ignore lint/suspicious/noDocumentCookie: Vercel did it so can I too
    document.cookie = `${COOKIES.STABLE_ID}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    router.refresh();
  };

  return (
    <div className="fixed bottom-2 right-2 p-3 bg-[#333333] rounded shadow-lg z-50 flex flex-col gap-2">
      <span className="text-white font-mono text-xs">Dev Tools</span>
      <button
        type="button"
        className="bg-white text-black font-mono text-xs rounded px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors active:bg-gray-300"
        onClick={deleteCookie}
      >
        Reset Stable ID
      </button>
    </div>
  );
}
