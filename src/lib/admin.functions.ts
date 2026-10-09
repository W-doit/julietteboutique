import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";

type AdminSession = { admin?: boolean };

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "juliette-admin",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

async function digest(s: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));
}
async function matches(input: string, expected: string) {
  const [a, b] = await Promise.all([digest(input), digest(expected)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function requireAdmin() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.admin) throw new Error("No autorizado");
}

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  return { admin: !!session.data.admin };
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => z.object({ password: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected || !(await matches(data.password, expected))) return { ok: false as const };
    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ admin: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true };
});

const itemSchema = z.object({
  id: z.string().uuid().optional(),
  category: z.string().trim().min(1).max(60),
  name: z.string().trim().min(1).max(100),
  subtitle: z.string().trim().max(200),
  label: z.string().trim().max(60),
  image_url: z.string().max(500),
  sort: z.number().int(),
});

export const saveItem = createServerFn({ method: "POST" })
  .inputValidator((d: z.infer<typeof itemSchema>) => itemSchema.parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...row } = data;
    const res = id
      ? await supabaseAdmin.from("collection_items").update(row).eq("id", id)
      : await supabaseAdmin.from("collection_items").insert(row);
    if (res.error) throw new Error("No se pudo guardar");
    return { ok: true };
  });

export const deleteItem = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("collection_items").delete().eq("id", data.id);
    if (error) throw new Error("No se pudo borrar");
    return { ok: true };
  });

export const uploadImage = createServerFn({ method: "POST" })
  .inputValidator((d: { base64: string; type: string }) =>
    z.object({ base64: z.string().max(14_000_000), type: z.enum(["image/jpeg", "image/png", "image/webp"]) }).parse(d),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const bytes = Uint8Array.from(atob(data.base64), (c) => c.charCodeAt(0));
    const ext = data.type.split("/")[1];
    const path = `${crypto.randomUUID()}.${ext}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage.from("collection").upload(path, bytes, { contentType: data.type });
    if (error) throw new Error("No se pudo subir la imagen");
    return { ref: `storage:${path}` };
  });
