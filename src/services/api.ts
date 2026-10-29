import type { SiteContent } from "../types";
const base = (import.meta as ImportMeta & { env: Record<string, string> }).env
  .VITE_API_BASE_URL;
export const apiConfigured = Boolean(base);
export async function requestEndpoint(
  endpoint: "settings" | "rooms" | "gallery" | "announcements",
  signal?: AbortSignal,
): Promise<unknown> {
  if (!base) throw new Error("API manzili sozlanmagan");
  const response = await fetch(`${base.replace(/\/$/, "")}/api/${endpoint}`, {
    signal,
  });
  if (!response.ok) throw new Error(`API xatosi: ${response.status}`);
  return response.json();
}
// API hujjati olinmaguncha javob formatini taxmin qilmaymiz.
// Tekshirilgan javoblarni SiteContent ga o‘giruvchi adapter shu yerda yoziladi.
export async function loadSiteContent(
  _signal?: AbortSignal,
): Promise<SiteContent> {
  throw new Error("API javob formati hali tasdiqlanmagan");
}
