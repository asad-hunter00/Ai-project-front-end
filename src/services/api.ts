import type { Settings, SiteContent, Announcement } from "../types";
import { initialContent } from "../data/content";
const base =
  (
    import.meta as ImportMeta & { env: Record<string, string> }
  ).env.VITE_API_BASE_URL?.trim() || "/backend";
export const apiConfigured = Boolean(base);
export async function requestEndpoint(
  endpoint: "settings" | "rooms" | "gallery" | "announcements",
  signal?: AbortSignal,
): Promise<unknown> {
  if (!base) throw new Error("API manzili sozlanmagan");
  const response = await fetch(`${base.replace(/\/+$/, "")}/api/${endpoint}`, {
    signal,
  });
  if (!response.ok) throw new Error(`API xatosi: ${response.status}`);
  return response.json();
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function safeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export function parseSettingsResponse(value: unknown): Settings {
  if (!record(value) || value.success !== true || !record(value.data))
    throw new Error("API javobi noto‘g‘ri");
  const d = value.data;
  if (
    typeof d.name !== "string" ||
    !d.name.trim() ||
    typeof d.address !== "string" ||
    typeof d.opening_time !== "string" ||
    typeof d.closing_time !== "string" ||
    !/^\d{2}:\d{2}(:\d{2})?$/.test(d.opening_time) ||
    !/^\d{2}:\d{2}(:\d{2})?$/.test(d.closing_time) ||
    !Array.isArray(d.phones) ||
    !d.phones.length ||
    !d.phones.every(
      (p) => typeof p === "string" && /^\+?[\d\s()-]{7,25}$/.test(p),
    )
  ) {
    throw new Error("Choyxona sozlamalari formati noto‘g‘ri");
  }
  return {
    name: d.name,
    address: d.address,
    hours: `${d.opening_time.slice(0, 5)}–${d.closing_time.slice(0, 5)}`,
    phones: d.phones as string[],
    description: typeof d.description === "string" ? d.description : undefined,
    scheduleNotes:
      typeof d.schedule_notes === "string" ? d.schedule_notes : undefined,
    mapUrl: safeUrl(d.map_url),
    telegramUrl: safeUrl(d.telegram_url),
    instagramUrl: safeUrl(d.instagram_url),
  };
}
export function parseAnnouncementsResponse(
  value: unknown,
  now = Date.now(),
): Announcement[] {
  if (!record(value) || value.success !== true || !Array.isArray(value.data)) {
    throw new Error("E’lonlar javobi noto‘g‘ri");
  }
  return value.data.flatMap((item): Announcement[] => {
    if (
      !record(item) ||
      typeof item.id !== "string" ||
      typeof item.title !== "string" ||
      typeof item.content !== "string" ||
      typeof item.is_published !== "boolean" ||
      typeof item.starts_at !== "string" ||
      typeof item.ends_at !== "string"
    ) {
      throw new Error("E’lon formati noto‘g‘ri");
    }
    const start = Date.parse(item.starts_at),
      end = Date.parse(item.ends_at);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start)
      throw new Error("E’lon sanasi noto‘g‘ri");
    if (!item.is_published || now < start || now >= end) return [];
    // API currently supplies Uzbek only. Never invent automatic translations.
    return [
      {
        id: item.id,
        title: { uz: item.title, ru: "", en: "" },
        text: { uz: item.content, ru: "", en: "" },
        active: true,
      },
    ];
  });
}
export async function loadSiteContent(
  signal?: AbortSignal,
): Promise<SiteContent> {
  // Rooms and gallery item schemas are unverified: preserve their existing content.
  const [settings, announcements] = await Promise.allSettled([
    requestEndpoint("settings", signal).then(parseSettingsResponse),
    requestEndpoint("announcements", signal).then((value) =>
      parseAnnouncementsResponse(value),
    ),
  ]);
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  return {
    ...initialContent,
    settings:
      settings.status === "fulfilled"
        ? settings.value
        : initialContent.settings,
    announcements:
      announcements.status === "fulfilled" ? announcements.value : [],
    loadWarning:
      settings.status === "rejected" || announcements.status === "rejected",
  };
}
