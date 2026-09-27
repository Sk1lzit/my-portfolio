import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Пропускаем всё, что не требует авторизации: статику, вебхуки
    "/((?!_next|api/webhooks|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // API routes, КРОМЕ /api/webhooks/*
    "/(api|trpc)((?!webhooks).*)",
  ],
};