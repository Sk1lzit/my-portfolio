import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Пропускаем всё, кроме: статики, /api/webhooks, /api/trpc
    "/((?!api/webhooks|_next|.*\\..*).*)",
  ],
};