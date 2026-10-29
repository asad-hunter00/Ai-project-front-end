import type { SiteContent, MenuItem } from "../types";
export const initialContent: SiteContent = {
  settings: {
    name: "O‘ktam ota choyxonasi",
    address: "Jizzax shahri, Eron zapravkasi oldida",
    hours: "09:00–23:50",
    phones: ["+998 91 567 28 15", "+998 90 486 96 11"],
  },
  rooms: [],
  gallery: [],
  announcements: [],
};
// Tasdiqlangan menyu va suratlarni shu yerga qo‘shing. Rasmlar public/images/ ichida saqlanadi.
export const menuItems: MenuItem[] = [
  {
    "id": "qoy-koska",
    "name": {
      "uz": "Qo‘y koska",
      "ru": "Коска из баранины",
      "en": "Lamb koska"
    },
    "image": "/images/menu/qoy-koska.png"
  },
  {
    "id": "mol-koska",
    "name": {
      "uz": "Mol koska",
      "ru": "Коска из говядины",
      "en": "Beef koska"
    },
    "image": "/images/menu/mol-koska.png"
  },
  {
    "id": "keskis-shashlik",
    "name": {
      "uz": "Keskis shashlik",
      "ru": "Шашлык «Кескис»",
      "en": "Keskis shashlik"
    },
    "image": "/images/menu/keskis-shashlik.png"
  },
  {
    "id": "koska-rulet",
    "name": {
      "uz": "Koska rulet",
      "ru": "Коска-рулет",
      "en": "Koska roll"
    },
    "image": "/images/menu/koska-rulet.png"
  },
  {
    "id": "qoy-biqin",
    "name": {
      "uz": "Qo‘y biqin shashlik",
      "ru": "Шашлык «Куй бикин»",
      "en": "Lamb biqin shashlik"
    },
    "image": "/images/menu/qoy-biqin.png"
  },
  {
    "id": "bomba",
    "name": {
      "uz": "Bomba shashlik",
      "ru": "Шашлык «Бомба»",
      "en": "Bomba shashlik"
    },
    "image": "/images/menu/bomba.png"
  },
  {
    "id": "rulet",
    "name": {
      "uz": "Rulet shashlik",
      "ru": "Шашлык-рулет",
      "en": "Roll shashlik"
    },
    "image": "/images/menu/rulet.png"
  },
  {
    "id": "qoy-jigar",
    "name": {
      "uz": "Qo‘y jigar shashlik",
      "ru": "Шашлык из бараньей печени",
      "en": "Lamb liver shashlik"
    },
    "image": "/images/menu/qoy-jigar.png"
  },
  {
    "id": "tovuq",
    "name": {
      "uz": "Tovuq shashlik",
      "ru": "Куриный шашлык",
      "en": "Chicken shashlik"
    },
    "image": "/images/menu/tovuq.png"
  }
];
