import { Icon, RoomDrawing } from "../components/Icon";
import {
  Rooms,
  Menu,
  Gallery,
  Announcements,
  Contact,
  FAQ,
} from "../components/Sections";
import { menuItems } from "../data/content";
import type { SiteContent } from "../types";
import { usePreferences } from "../i18n";
export function HomePage({
  content,
  status,
}: {
  content: SiteContent;
  status: "idle" | "loading" | "error";
}) {
  const { t } = usePreferences();
  return (
    <>
      <section id="bosh" className="hero">
        <img
          className="hero-image"
          src="/images/tea-hero.webp"
          alt=""
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">{t.tag}</span>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroText}</p>
            <div className="hero-actions">
              <a className="button primary" href="tel:+998915672815">
                <Icon name="phone" />
                {t.call}
              </a>
              <a className="button outline" href="#xonalar">
                {t.seeRooms}
                <Icon name="arrow" />
              </a>
            </div>
          </div>
        </div>
        <p className="image-note">{t.decorative}</p>
      </section>
      <div className="stats">
        {t.stats.map((s, i) => (
          <div className="stat" key={i}>
            <Icon name={(["door", "users", "snow"] as const)[i]} />
            <h3>{s}</h3>
            <p>{t.statText[i]}</p>
          </div>
        ))}
      </div>
      <section id="haqimizda" className="section about">
        <div className="about-copy">
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <p>{t.aboutText2}</p>
          <a className="button outline" href="#xonalar">
            {t.more}
            <Icon name="arrow" />
          </a>
        </div>
        <div className="about-drawing">
          <div className="circle" />
          <RoomDrawing />
        </div>
      </section>
      {status !== "idle" && (
        <p className="data-status" role="status">
          {status === "loading" ? t.loading : t.error}
        </p>
      )}
      <Rooms rooms={content.rooms} />
      <Menu items={menuItems} />
      <Gallery images={content.gallery} />
      <Announcements items={content.announcements} />
      <FAQ />
      <Contact />
    </>
  );
}
