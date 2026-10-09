import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type CollectionItem = {
  id: string;
  category: string;
  name: string;
  subtitle: string;
  label: string;
  image: string; // "default:<key>" or a signed URL
  image_ref: string;
  sort: number;
};

export const listCollection = createServerFn({ method: "GET" }).handler(async (): Promise<CollectionItem[]> => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const sb = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
  const { data, error } = await sb
    .from("collection_items")
    .select("id, category, name, subtitle, label, image_url, sort")
    .order("sort")
    .order("created_at");
  if (error) {
    console.error(error);
    return [];
  }
  const paths = data.filter((r) => r.image_url.startsWith("storage:")).map((r) => r.image_url.slice(8));
  const signed = new Map<string, string>();
  if (paths.length) {
    // Private bucket: sign only the paths stored in the public catalogue.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: urls } = await supabaseAdmin.storage.from("collection").createSignedUrls(paths, 60 * 60 * 24 * 7);
    urls?.forEach((u) => u.path && u.signedUrl && signed.set(u.path, u.signedUrl));
  }
  return data.map((r) => ({
    id: r.id,
    category: r.category,
    name: r.name,
    subtitle: r.subtitle,
    label: r.label,
    sort: r.sort,
    image_ref: r.image_url,
    image: r.image_url.startsWith("storage:") ? (signed.get(r.image_url.slice(8)) ?? "") : r.image_url,
  }));
});
