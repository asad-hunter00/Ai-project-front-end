# Kengaytirilgan O‘ktam ota sayti

## Ishga tushirish
ZIP ichidagi fayllarni yangi loyiha papkasiga oching. package.json shu papkaning o‘zida tursin.

    npm install
    npm run dev

Production build: `npm run build`. Netlify publish directory: `dist`.

## Qo‘shilganlar
- Har bir taomning batafsil oynasi: taom haqida, go‘sht/tarkib, manba va sifat, mijozlar fikri.
- Taomni saqlash va tanlanganlar filtri. Tanlanganlar faqat shu brauzerda saqlanadi.
- Taom havolasini ulashish: `/menu?dish=tovuq` kabi manzil bevosita o‘sha taomni ochadi.
- 10 ta donalik shashlik (qiyma ham qo‘shildi), 3 ta kiloli variant va Achchiq-chuchuk salati; kategoriya va qidiruv.
- Salat uchun bezak illustratsiya (haqiqiy taom fotosurati emas).
- Bosh sahifada davra/qulayliklar, kengaytirilgan menyu tanlovi, salat tanishtiruvi, 3 qadamli tashrif qo‘llanmasi va aloqa bloki.
- UZ/RU/EN tillarida 10 ta savol-javob.
- Mavjud light/dark, React route’lar, settings/announcements API ulanishlari saqlandi.
- Galereya dizayni saqlanib, foydalanuvchi yuborgan 3 ta xona/zallar surati qo‘shildi.

## Kontentni to‘ldirish
`src/data/content.ts` → `menuItems`:
- `meat`: nomidan aniq bo‘lgan go‘sht turi. Noma’lum variantlar uchun taxmin kiritilmadi.
- `ingredients`: haqiqiy retseptni uch tilda kiriting. Salatdagi matn an’anaviy retsept haqida, aynan choyxona retsepti tasdiqlanmagan.
- `source`: egasi tasdiqlagan yetkazib beruvchi va manba.
- `quality`: tasdiqlangan sifat ma’lumotlari/hujjatlar.
- `reviews`: faqat haqiqiy, chop etishga ruxsat berilgan mijoz fikrlari. Format: id, name, text {uz,ru,en}, rating (1–5), date.
- `price`, `portion`: tasdiqlangach qo‘shiladi.

Haqiqiy mijozlar sharhi berilmagani sababli soxta reyting yoki fikrlar yo‘q. Sharhlar bo‘sh holat bilan ko‘rsatiladi. Telefon orqali fikr bildirish havolasi mavjud. Bu versiyada sharhlarni serverga yuborish yoki moderatsiya qilish API’si yaratilmagan; avtomatik sharh qabul qilish deb ko‘rsatilmaydi.

Admin panel hali bu arxivda yo‘q: backend manba kodi berilmagan. Mavjud backendga faqat oldin tasdiqlangan o‘qish endpointlari orqali ulanish saqlangan.

## Tekshiruvlar
- TypeScript va production build o‘tdi.
- Uch tilda 10 tadan FAQ, 10 ta taom, salat kategoriyasi, qidirish va taomga bevosita havolaning renderi sinovdan o‘tdi.
- Galereya komponentlari saqlandi; yangi suratlarning mavjudligi tekshirildi.
- Ushbu muhitda brauzer o‘rnatilishi tarmoq cheklovi sabab tugamadi. To‘liq vizual va click tekshiruvi kompyuterda zarur: taom oynasi, tablar, Escape, tanlanganlar, ulashish, til/tema va telefon o‘lchamini tekshiring.

## Narxlar yangilanishi
Donalik: qo‘y koska 40 000; mol koska 40 000; keskis 40 000; koska rulet 40 000; qo‘y biqin 55 000; bomba 40 000; rulet 40 000; qo‘y jigar 28 000; tovuq 18 000 so‘m.
Kiloli: qiyma 170 000; qo‘y koska 190 000; tovuq 70 000 so‘m / 1 kg.
Donalik qiyma va salat narxi berilmagan, taxminiy narx qo‘shilmadi.
Kiloli mahsulot rasmlari tayyorlashdan oldingi ko‘rinish sifatida belgilangan. Tortish/pishirish tartibi tasdiqlanmagani uchun taxmin kiritilmadi. Rasmlar foydalanuvchi yuborgan fayllardan WebP formatiga o‘tkazildi, ko‘rinishiga mazmuniy o‘zgartirish kiritilmadi.
12 ta narx, 3 tildagi birliklar, 14 ta taom, rasm yo‘llari va 3 ta galereya surati sinovdan o‘tdi.

## Yangi taomlar va aniq manzil
Achchiq-chuchuk rasmi yangilandi; narxi 20 000 so‘m / porsiya. Qattiq (okroshka) 20 000 so‘m / porsiya; sho‘rva narxi berilmagan. Foydalanuvchining “20 so‘m” iborasi suhbatdagi narxlar asosida 20 000 deb qabul qilindi; chop etishdan oldin tasdiqlang.
Manzil: Sarvar Azimov ko‘chasi 47, 131100, Jizzax, Jizzax viloyati, O‘zbekiston. Koordinatalar: 40.138759, 67.794645.
`src/data/location.ts` — yangilangan manzilning yagona manbasi. Backend hali eski manzilni qaytarishi mumkin, shu sabab sayt ushbu yangiroq tasdiqlangan manzil va xarita havolasini ustun qo‘llaydi. Baza masofadan o‘zgartirilmadi.
Xarita internet va Google Maps mavjudligiga bog‘liq. Tashqi “Yo‘l olish” havolasi ham bor.
Galereyada avvalgi 3 ta xona surati va yangi mangal, dasturxon, kirish hamda hovli suratlari bor. Rasmlar foydalanuvchining fayllari, ularning kelib chiqishi/haqiqiyligi haqida qo‘shimcha da’vo qo‘shilmadi.
