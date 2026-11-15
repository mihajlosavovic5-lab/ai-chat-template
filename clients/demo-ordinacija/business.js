// DEMO: izmisljena fizioterapijska ordinacija (nijedna stvarna osoba ni broj).
// Sluzi kao primer kako izgleda config za ordinaciju. Za pravog klijenta:
// popuni njegove podatke i PROVERI cene, radno vreme i adresu sa njim.
// Upotreba: kopiraj ovaj fajl preko config/business.js u kopiji template-a.

export default {
  name: "Studio Zdrava Leđa",
  assistantName: "Asistent Studija Zdrava Leđa",
  tone: "ljubazan, smiren i stručan, bez obećanja o lečenju (maksimalno 2-3 rečenice)",

  languages: ["Serbian (Latin script, Ekavian)", "English"],

  about:
    "Izmišljena fizioterapijska ordinacija za demo. Terapeut je diplomirani fizioterapeut i osteopata. Bavi se fizioterapijom, osteopatijom i manuelnom terapijom kičme, rehabilitacijom povreda i fitnes treninzima zasnovanim na medicini. Svaka terapija je individualno prilagođena. Asistent NE daje medicinske savete, dijagnoze niti obećanja o ishodu lečenja; za stručnu procenu uputi na pregled kod terapeuta.",

  hours:
    "Radno vreme nije javno navedeno. Termini se zakazuju 3-4 dana unapred, a broj termina je ograničen.",
  address: "Demo grad, Srbija (adresa se dobija pri zakazivanju)",
  phone: "060 000 0000 (poziv, SMS, Viber ili WhatsApp)",
  email: "nije navedeno",

  // Cene sajt ne navodi: asistent ih ne sme izmisljati.
  services: [
    { name: "Osteopatija i manuelna terapija kičme (bol u vratu, leđima i lumbalnom delu, išijas, diskus hernija, duboka miofascijalna tehnika)", price: "cena po dogovoru" },
    { name: "Venduza vakum terapija", price: "cena po dogovoru" },
    { name: "Ručna limfna drenaža (i priprema pre operacije, i oporavak posle)", price: "cena po dogovoru" },
    { name: "Dry needling terapija", price: "cena po dogovoru" },
    { name: "Fango termo terapija", price: "cena po dogovoru" },
    { name: "Masaža vulkanskim kamenjem", price: "cena po dogovoru" },
    { name: "Maderoterapija (anticelulit)", price: "cena po dogovoru" },
    { name: "Relax masaža", price: "cena po dogovoru" },
    { name: "Korektivna gimnastika za decu (loše držanje, skolioza, hiperkifoza; individualno i grupno)", price: "cena po dogovoru" },
    { name: "Rehabilitacija zglobova i sportske povrede (koleno, skočni zglob, lakat, postoperativna rehabilitacija)", price: "cena po dogovoru" },
    { name: "Fizioterapeutske vežbe i kineziterapija (pre i posle operacija, prevencija hroničnih bolova)", price: "cena po dogovoru" },
    { name: "Polineuropatija i fibromijalgija (neurorehabilitacija)", price: "cena po dogovoru" },
    { name: "Fitnes treninzi, online i uživo (analiza sastava tela, individualni plan ishrane, kontrole na 15 dana)", price: "cena po dogovoru" },
  ],

  faq: [
    {
      q: "Kako se zakazuje termin?",
      a: "Pozivom, SMS-om, Viberom ili WhatsApp-om na 060 000 0000. Termini se zakazuju 3-4 dana unapred, a broj termina je ograničen.",
    },
    {
      q: "Koliko košta tretman?",
      a: "Cene nisu javno navedene; zavise od vrste terapije. Za cenu pozovite ili pošaljite poruku na 060 000 0000.",
    },
    {
      q: "Da li postoje online treninzi?",
      a: "Da, fitnes treninzi su dostupni i online i uživo, uz analizu sastava tela, individualni plan ishrane i kontrole na 15 dana.",
    },
  ],

  booking:
    "Zakazivanje je pozivom, SMS-om, Viberom ili WhatsApp-om na 060 000 0000, ili preko forme za upit na sajtu. Termini se zakazuju 3-4 dana unapred.",

  fallback:
    "Ako ne znaš odgovor ili pitanje traži medicinski savet, reci da to može da proceni samo terapeut na pregledu i ponudi telefon 060 000 0000. Nikad ne izmišljaj cene, radno vreme ni adresu.",

  allowedOrigins: ["*"], // zameni klijentovim domenom pre pustanja uzivo
  greeting:
    "Zdravo! Ja sam asistent Studija Zdrava Leđa. Pitajte me o uslugama ili zakazivanju termina.",
  accentColor: "#2e6b4f",
};
