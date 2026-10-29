# O‘ktam ota choyxonasi

React + TypeScript + Vite. Frontend tayyor; backend ulanmagan va qayta yozilmagan.

## Ishga tushirish

```bash
npm install
npm run dev
```

Tekshirish va production yig‘ish: `npm run build`. Natija `dist/` ichida.

## Tuzilma

- `src/App.tsx`: sahifa kompozitsiyasi va asosiy bo‘limlar.
- `src/components/Header.tsx`: asl logotip, navigatsiya, mobil menyu, til va rejim tugmalari.
- `src/components/Sections.tsx`: xonalar, menyu kartochkasi, galereya, kattalashtirish oynasi, savollar, aloqa va faol e’lonlar.
- `src/components/Icon.tsx`: SVG ikonlar va dekorativ xona chizmasi.
- `src/i18n.tsx`: barcha UZ / RU / EN matnlari, til va rejim holati.
- `src/styles.css`: responsive light/dark uslublar, `prefers-reduced-motion` yordami.
- `src/services/api.ts`: alohida, hali ulanmagan API xizmati.
- `src/data/content.ts`: tasdiqlangan ma’lumotlar va hozircha bo‘sh ro‘yxatlar.

Birinchi tashrif: UZ va light. Keyingi tanlovlar `localStorage` dagi `oktam-language` va `oktam-theme` kalitlarida saqlanadi. Saqlash bloklangan brauzerda ham sayt ishlaydi.

## Ertaga menyu va rasmlar qo‘shish

`src/data/content.ts` faylida `menuItems` ga haqiqiy menyuni qo‘shing. `MenuItem` tuzilmasi `src/types.ts` da: `id`, `name`, `category`, `description`, `price` (so‘mda son), `portion`, ixtiyoriy `image`. Matn maydonlari `{ uz: '…', ru: '…', en: '…' }` shaklida — har bir til uchun haqiqiy tarjima kiriting. Narx tarjima qilinmaydi; tanlangan tilga mos formatlanadi.

Haqiqiy suratlarni `public/images/` ga saqlang. `initialContent.gallery` ro‘yxatiga `id`, `src` (`/images/fayl.webp`) va `alt` (`{uz,ru,en}`) qo‘shing. Grid, kattalashtirish, tashqarini bosib yoki Escape bilan yopish va fokusni qaytarish tayyor.

`initialContent.rooms` ga haqiqiy xonalarni kiritsa bo‘ladi. Faqat `published: true` xonalar chiqariladi. Nom, tavsif va qulayliklar uch tilli. Xona ro‘yxati bo‘sh bo‘lsa umumiy tasdiqlangan tanishtiruv turadi. `initialContent.announcements` bo‘sh yoki e’lonlar faol bo‘lmasa bo‘lim umuman ko‘rinmaydi; `active: true` e’lonlar chiqariladi.

Asosiy sahifa matnlari va manzil tarjimalari `src/i18n.tsx` da. Telefonlar `content.ts` hamda telefon tugmalarida tasdiqlangan raqamlarga yo‘naltirilgan.

## Backendni keyin ulash

`.env.example` dan `.env` yarating. `VITE_API_BASE_URL` ochiq API manzili uchun; maxfiy yoki service_role kalitini frontendga joylashtirmang. Vite env qiymatlari build vaqtida frontendga yoziladi; o‘zgarsa qayta build kerak.

Ulashdan oldin Google AI Studio’dagi backendning haqiqiy asosiy URL manzili, CORS sozlamasi, autentifikatsiya talabi (bo‘lsa), quyidagi endpointlarning haqiqiy JSON namunalari yoki API hujjati kerak:

- `GET /api/settings`
- `GET /api/rooms`
- `GET /api/gallery`
- `GET /api/announcements`

`requestEndpoint` faqat `unknown` JSON qaytaradi — backend javobi taxmin qilinmagan. `loadSiteContent` hozir ataylab ulanmagan va hech qanday endpointni chaqirmaydi. Hujjat kelganda runtime tekshiruvlari va haqiqiy javobni frontenddagi `SiteContent` ga o‘giruvchi adapter shu faylda yoziladi. Bu frontendning ichki kontent turi, backend shartnomasi emas. Lokalizatsiya va nashr/faollik shartlari ham tekshiriladi. Birgina env manzilini kiritish ulanishni ishga tushirmaydi.

Hozir env bo‘lmasa tasdiqlangan boshlang‘ich kontent ishlaydi. Yuklanish va xato interfeysi uch tilda tayyor; xato bo‘lsa boshlang‘ich kontent saqlanadi. Menyu endpointi mavjud deb olinmagan.

## Rasmlar

`public/images/oktam-ota-logo.png` — foydalanuvchi yuborgan asl PNG, o‘zgartirilmagan.

`public/images/tea-hero.webp` — imagegen orqali yaratilgan dekorativ tasvir; haqiqiy choyxona surati emas. Sahifada uch tilda izohi bor. Generatsiya tavsifi: tabiiy iliq yorug‘lik, yog‘och stol ustida yashil choynak va ikkita piyola, orqada yog‘och panjarali deraza, chapda matn uchun ochiq joy, ortiqcha oltin naqshlarsiz, matn va logotipsiz. Yaratishda ichki imagegen vositasi ishlatilgan.

## Tekshirish

Production build TypeScript tekshiruvini ham bajaradi. Brauzerda til/rejim almashishi va qayta yuklanganda saqlanishi, mobil menyu ochilishi va bo‘limga o‘tgach yopilishi, telefon havolalari va responsive joylashuv tekshirildi. To‘liq backend tekshiruvi API hujjati kelgandan keyin qilinadi.

## 2026-10-29 menyu yangilanishi

Foydalanuvchi bergan 9 ta nom va dastlabki 9 ta rasm bir xil tartibda `menuItems` ga qo‘shildi. `public/images/menu/` ichidagi PNG fayllar asl nusxada saqlangan. Nom berilmagan o‘ninchi rasm qo‘shilmagan. Narx, porsiya, kategoriya va tavsif endi ixtiyoriy: haqiqiy ma’lumot kiritilmaguncha kartochkada ko‘rinmaydi. Taom nomlari uch tilda kiritilgan; retsept yoki tarkib haqida qo‘shimcha da’vo yo‘q.

## Alohida sahifalar va Netlify

React Router orqali `/`, `/menu`, `/gallery` va noma’lum manzillar uchun 404 sahifasi ishlaydi. Umumiy header/footer hamda til va tema tanlovi barcha sahifalarda saqlanadi. Bosh sahifada menyuning dastlabki 3 ta taomi va qisqa galereya mavjud. To‘liq menyu `/menu` da; QR-kod uchun shu manzilni ishlating.

`public/_redirects` Vite build vaqtida `dist/_redirects` ga ko‘chadi. Undagi `/* /index.html 200` Netlify’da `/menu` yoki `/gallery` ni to‘g‘ridan-to‘g‘ri ochish va refresh qilishni ta’minlaydi. Netlify build command: `npm run build`; publish directory: `dist`. Kelajakdagi API proxy yoki maxsus redirect qoidalarini umumiy SPA fallbackdan oldin yozing. Hozir API proxy sozlamasi mavjud emas; API xizmati o‘zgartirilmagan. Netlify hostingining o‘zida deploy qilinmaguncha uning muhitidagi refresh tekshiruvi alohida bajariladi.

Menyu nom bo‘yicha tanlangan tilda qidiriladi, apostrofning turli yozilishlari moslashtiriladi. Kategoriyalar faqat mavjud `category` maydonidan olinadi. Hozir 9 ta taomda kategoriya berilmagan, shu sabab `Barchasi` va `Kategoriyasi kiritilmagan` holatlari bor. Narx/tavsif/porsiya berilmagan bo‘lsa, kartochka va tafsilot oynasida ko‘rsatilmaydi.

Taomlar bosilganda katta rasm va mavjud tafsilotlar ochiladi. Galereyada oldingi/keyingi rasm tugmalari, klaviaturadagi chap/o‘ng tugmalari, Escape bilan yopish va native dialogning fokus boshqaruvi ishlaydi. Haqiqiy galereya hali bo‘sh, uning navigatsiyasi faqat vaqtinchalik sinov ma’lumotlari bilan alohida tekshirildi; sinov fayllari yakuniy loyihaga kiritilmaydi.

Yangi tuzilma: `src/pages/` sahifalar; `src/components/Footer.tsx`, `RouteEffects.tsx`, `MediaDialog.tsx`, `MenuCard.tsx`, `GalleryContent.tsx`, `Leaf.tsx` umumiy komponentlar; `src/utils/menu.ts` qidiruv va kategoriya filtrlari.
