import dress from "@/assets/juliette-dress.jpg";
import knit from "@/assets/juliette-knit.jpg";
import occasion from "@/assets/juliette-occasion.jpg";

const defaults: Record<string, string> = { "default:dress": dress, "default:knit": knit, "default:occasion": occasion };
export const resolveImage = (src: string) => defaults[src] ?? src ?? dress;

// Placeholder until the WhatsApp Business catalogue link is available.
export const WHATSAPP_CATALOG_URL = "https://wa.me/c/PLACEHOLDER";
export const CATEGORIES = ["Vestidos", "Esenciales", "Ocasiones especiales"];
