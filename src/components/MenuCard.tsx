import { useState } from "react";
import type { MenuItem } from "../types";
import { usePreferences } from "../i18n";
import { MediaDialog } from "./MediaDialog";
function Details({ item }: { item: MenuItem }) {
  const { lang, t } = usePreferences();
  return (
    <>
      {item.category && <span className="eyebrow">{item.category[lang]}</span>}
      <h3>{item.name[lang]}</h3>
      {item.description && <p>{item.description[lang]}</p>}
      {(item.portion || item.price !== undefined) && (
        <div className="dish-meta">
          {item.portion && <span>{item.portion[lang]}</span>}
          {item.price !== undefined && (
            <strong>
              {new Intl.NumberFormat(
                lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru-RU" : "en-GB",
              ).format(item.price)}{" "}
              {t.currency}
            </strong>
          )}
        </div>
      )}
    </>
  );
}
export function MenuCard({ item }: { item: MenuItem }) {
  const { lang, t } = usePreferences();
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="menu-card interactive-card">
        <button
          className="dish-trigger"
          aria-label={`${t.dishDetails}: ${item.name[lang]}`}
          onClick={() => setOpen(true)}
        >
          {item.image && (
            <img src={item.image} alt="" loading="lazy" decoding="async" />
          )}
          <Details item={item} />
        </button>
      </article>
      {open && (
        <MediaDialog title={item.name[lang]} onClose={() => setOpen(false)}>
          {item.image && (
            <img
              className="dish-large-image"
              src={item.image}
              alt={item.name[lang]}
              loading="lazy"
            />
          )}
          <div className="dish-details">
            <Details item={item} />
          </div>
        </MediaDialog>
      )}
    </>
  );
}
