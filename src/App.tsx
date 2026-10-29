import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { RouteEffects } from "./components/RouteEffects";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { GalleryPage } from "./pages/GalleryPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { initialContent, menuItems } from "./data/content";
import { apiConfigured, loadSiteContent } from "./services/api";
import { usePreferences } from "./i18n";
export default function App() {
  const { t } = usePreferences();
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  useEffect(() => {
    if (!apiConfigured) return;
    const controller = new AbortController();
    setStatus("loading");
    loadSiteContent(controller.signal)
      .then((data) => {
        setContent(data);
        setStatus("idle");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });
    return () => controller.abort();
  }, []);
  return (
    <BrowserRouter>
      <RouteEffects />
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={<HomePage content={content} status={status} />}
          />
          <Route path="/menu" element={<MenuPage items={menuItems} />} />
          <Route
            path="/gallery"
            element={<GalleryPage images={content.gallery} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer phones={content.settings.phones} />
    </BrowserRouter>
  );
}
