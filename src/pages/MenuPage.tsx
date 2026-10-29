import { useState } from "react";
import type { MenuItem } from "../types";
import { usePreferences } from "../i18n";
import { MenuCard } from "../components/MenuCard";
import { Menu } from "../components/Sections";
import { categoryKey, filterMenu, UNCATEGORIZED } from "../utils/menu";
export function MenuPage({ items }: { items: MenuItem[] }) {
  const { t, lang } = usePreferences();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = new Map<string, string>();
  items.forEach((item) =>
    categories.set(categoryKey(item), item.category?.[lang] ?? t.uncategorized),
  );
  const filtered = filterMenu(items, query, category, lang);
  return (
    <div className="route-page">
      <header className="page-heading">
        <span className="eyebrow">{t.tag}</span>
        <h1>{t.fullMenu}</h1>
      </header>
      {items.length ? (
        <section className="section menu-catalog" aria-label={t.menuTitle}>
          <div className="menu-tools">
            <label>
              {t.searchMenu}
              <input
                type="search"
                value={query}
                placeholder={t.searchPlaceholder}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label>
              {t.category}
              <select
                aria-label={t.category}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">{t.allCategories}</option>
                {Array.from(categories).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {categories.size === 1 && categories.has(UNCATEGORIZED) && (
            <p className="catalog-note">{t.categoriesPending}</p>
          )}
          <p className="results-count" role="status" aria-live="polite">
            {t.results}: {filtered.length}
          </p>
          {filtered.length ? (
            <div className="content-grid">
              {filtered.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>{t.noResults}</h2>
              <button
                className="button outline"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                {t.resetFilters}
              </button>
            </div>
          )}
        </section>
      ) : (
        <Menu items={items} />
      )}
    </div>
  );
}
