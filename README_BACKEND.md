# Render backend ulanishi

Tasdiqlangan GET /api/settings va GET /api/announcements ulangan. Menyu, rasmlar, route, til va tema saqlangan. Xonalar va galereya bo‘sh qaytgani uchun yozuvlar formati hali tasdiqlanmagan va ular ulanmagan.

## Kompyuterda
1. `.env.example` nusxasini `.env` deb saqlang.
2. `npm install`
3. `npm run dev`

## Netlify
Build: `npm run build`; publish papkasi: `dist`.
`.env.production`da VITE_API_BASE_URL=/backend berilgan. Vite dev proxy va Netlify public/_redirects so‘rovlarni haqiqiy Render serveriga uzatadi. Netlify Environment variables orqali `VITE_API_BASE_URL`ni ham berish mumkin. Qiymat o‘zgarsa qayta build/deploy qiling.

Bu manzil maxfiy kalit emas. Frontendga Supabase service_role kiritmang.

## Tekshirish
DevTools → Network’da /api/settings 200 ekanini tekshiring. Telefonlar, ish vaqti, brend nomi bazadan olinadi. Manzil va jadval izohi UZ’da bazadan, RU/EN’da mavjud tarjimalardan olinadi; bazadagi o‘zbekcha matn tarjimalarni almashtirmaydi. Admin manzil yoki jadval ma’nosini o‘zgartirsa RU/EN tarjimalarini ham yangilash zarur. Logo rasmidagi yozuv avtomatik o‘zgarmaydi.

API xatosida mavjud boshlang‘ich ma’lumotlar saqlanadi va sahifada lokalizatsiyalangan xato xabari chiqadi. Bu backend muvaffaqiyatli ulandi degani emas. Yuklanish xabari ham ko‘rsatiladi.

## CORS va proxy
Render tekshiruv javobida Access-Control-Allow-Origin yo‘q. Shu sabab sukut bo‘yicha `/backend` proxy qo‘llanadi; brauzer o‘z saytiga murojaat qiladi. Local dev’da vite.config.js, Netlify’da public/_redirects buni ta’minlaydi. Production’da bevosita Render URL’ni env’ga yozmang, aks holda CORS sozlash kerak bo‘ladi. Boshqa hosting uchun ham shu proxy qoidasini sozlang. Netlify deploy’ida `/backend/api/settings`ni tekshiring. `vite preview` server proxy’si sozlanmagan, lokal tekshiruv uchun `npm run dev` ishlating.

Backend brauzer origin’iga ruxsat berishi kerak. Lokal origin terminalda ko‘rsatilgan Vite manzili (odatda http://localhost:5173), production origin esa haqiqiy Netlify manzili. Backenddagi mavjud CORS mexanizmiga shu originlarni qo‘shing. no-cors ishlatmang. Bu arxivda backend kodi bo‘lmagani uchun uning CORS sozlamasi o‘zgartirilmadi.

## Bajarilgan tekshiruvlar
- TypeScript va production build muvaffaqiyatli.
- Render /api/settings haqiqiy javobi parser orqali tekshirildi.
- Noto‘g‘ri javob, bo‘sh telefonlar, xavfli URL va HTTP xatolari sinovdan o‘tdi.
- Ushbu muhitda Vite proxy’dan tashqi serverga so‘rov DNS cheklovi sabab yakunlanmadi; kompyuter va Netlify’da yuqoridagi Network tekshiruvi zarur.

E’lonlar bazadan olinadi. Nashr qilinmagan, muddati o‘tgan va kelajakdagi e’lonlar yashiriladi. API faqat o‘zbekcha e’lon yuboradi: RU/EN rejimida ham e’lon asli UZ tilida ko‘rinadi, sahifaning boshqa tarjimalari saqlanadi. Bir endpoint xatosi boshqasining muvaffaqiyatli ma’lumotini yo‘qotmaydi.
