import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const ADMIN_CLERK_ID = "user_3JpUFnk1yaEDHWw6DtZbouoE4gz";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = "whsec_XC+7oVj+z9F1F2inKNz/ZxNNxdx2IhQz";

  if (!WEBHOOK_SECRET) {
    console.error("[webhook] CLERK_WEBHOOK_SECRET не задан");
    return NextResponse.json({ error: "CLERK_WEBHOOK_SECRET not set" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log("[webhook] headers:", {
    svix_id,
    svix_timestamp,
    has_signature: !!svix_signature,
  });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("[webhook] Не хватает svix headers");
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

const body = await req.text();  // ← СЫРОЙ body

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    const verified = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    if (!verified) {
      console.error("[webhook] verify() вернул undefined");
      return NextResponse.json({ error: "Verification failed" }, { status: 400 });
    }

    evt = verified as WebhookEvent;
  } catch (err) {
    console.error("[webhook] Ошибка верификации:", err);
    console.error("[webhook] Body (первые 100):", body.slice(0, 100));
    console.error("[webhook] Secret (первые 10):", WEBHOOK_SECRET?.slice(0, 10));
    console.error("[webhook] Headers:", {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature?.slice(0, 30),
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (!evt || !evt.type) {
    console.error("[webhook] evt пустой:", evt);
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const eventType = evt.type;

  // ===== СОЗДАНИЕ ЮЗЕРА =====
  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, username, image_url } = evt.data;
    const email = email_addresses?.[0]?.email_address || null;
    const name =
      [first_name, last_name].filter(Boolean).join(" ") ||
      username ||
      "Пользователь";
    const role = id === ADMIN_CLERK_ID ? "ADMIN" : "USER";

    await prisma.user.upsert({
      where: { clerkId: id },
      create: { clerkId: id, email, name, avatar: image_url || null, role },
      update: { email, name, avatar: image_url || null },
    });

    console.log(`[webhook] Юзер создан: ${name} (${id}), роль: ${role}`);
  }

  // ===== ОБНОВЛЕНИЕ ЮЗЕРА =====
  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, username, image_url } = evt.data;
    const email = email_addresses?.[0]?.email_address || null;
    const name =
      [first_name, last_name].filter(Boolean).join(" ") ||
      username ||
      "Пользователь";

    await prisma.user
      .update({
        where: { clerkId: id },
        data: { email, name, avatar: image_url || null },
      })
      .catch(() => {});

    console.log(`[webhook] Юзер обновлён: ${name} (${id})`);
  }

  // ===== УДАЛЕНИЕ ЮЗЕРА =====
  if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (id) {
      await prisma.user.delete({ where: { clerkId: id } }).catch(() => {});
      console.log(`[webhook] Юзер удалён: ${id}`);
    }
  }

  return NextResponse.json({ received: true });
}