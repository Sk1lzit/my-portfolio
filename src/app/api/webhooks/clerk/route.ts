import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const ADMIN_CLERK_ID = "user_3JpUFnk1yaEDHWw6DtZbouoE4gz";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "CLERK_WEBHOOK_SECRET not set" },
      { status: 500 }
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Ошибка верификации вебхука:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, username, image_url } =
      evt.data;

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

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, username, image_url } =
      evt.data;

    const email = email_addresses?.[0]?.email_address || null;
    const name =
      [first_name, last_name].filter(Boolean).join(" ") ||
      username ||
      "Пользователь";

    await prisma.user.update({
      where: { clerkId: id },
      data: { email, name, avatar: image_url || null },
    });

    console.log(`[webhook] Юзер обновлён: ${name} (${id})`);
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (id) {
      await prisma.user
        .delete({ where: { clerkId: id } })
        .catch(() => {});
      console.log(`[webhook] Юзер удалён: ${id}`);
    }
  }

  return NextResponse.json({ received: true });
}