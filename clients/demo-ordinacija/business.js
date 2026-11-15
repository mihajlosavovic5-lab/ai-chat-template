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
    "Ponedeljak-petak 10:00-18:00, subota i nedelja zatvoreno. Termini se zakazuju 2-3 dana unapred.",
  address: "Demo grad, Srbija (adresa se dobija pri zakazivanju)",
  phone: "060 000 0000 (poziv, SMS, Viber ili WhatsApp)",
  email: "info@zdravaledja.example",

  // Izmisljene cene za demo. Kod pravog klijenta uzmi stvarne od njega.
  services: [
    { name: "Osteopatija i manuelna terapija kičme (bol u vratu, leđima i lumbalnom delu, išijas, diskus hernija, duboka miofascijalna tehnika)", price: "4.000 RSD (45 min)" },
    { name: "Venduza vakum terapija", price: "3.000 RSD (30 min)" },
    { name: "Ručna limfna drenaža (i priprema pre operacije, i oporavak posle)", price: "3.500 RSD (45 min)" },
    { name: "Dry needling terapija", price: "3.500 RSD (30 min)" },
    { name: "Fango termo terapija", price: "2.500 RSD (30 min)" },
    { name: "Masaža vulkanskim kamenjem", price: "5.000 RSD (60 min)" },
    { name: "Maderoterapija (anticelulit)", price: "3.500 RSD (45 min)" },
    { name: "Relax masaža", price: "3.000 RSD (45 min)" },
    { name: "Korektivna gimnastika za decu (loše držanje, skolioza, hiperkifoza; individualno i grupno)", price: "1.500 RSD po terminu" },
    { name: "Rehabilitacija zglobova i sportske povrede (koleno, skočni zglob, lakat, postoperativna rehabilitacija)", price: "3.500 RSD (45 min)" },
    { name: "Fizioterapeutske vežbe i kineziterapija (pre i posle operacija, prevencija hroničnih bolova)", price: "3.000 RSD (45 min)" },
    { name: "Polineuropatija i fibromijalgija (neurorehabilitacija)", price: "4.000 RSD (45 min)" },
    { name: "Fitnes treninzi, online i uživo (analiza sastava tela, individualni plan ishrane, kontrole na 15 dana)", price: "2.500 RSD po treningu" },
  ],

  faq: [
    {
      q: "Kako se zakazuje termin?",
      a: "Pozivom, SMS-om, Viberom ili WhatsApp-om na 060 000 0000. Termini se zakazuju 2-3 dana unapred.",
    },
    {
      q: "Koliko košta tretman?",
      a: "Cene zavise od vrste terapije, npr. vakum terapija 3.000 RSD, limfna drenaža 3.500 RSD. Tačan cenovnik dobijate pozivom na 060 000 0000.",
    },
    {
      q: "Da li postoje online treninzi?",
      a: "Da, fitnes treninzi su dostupni i online i uživo, uz analizu sastava tela, individualni plan ishrane i kontrole na 15 dana.",
    },
  ],

  booking:
    "Zakazivanje je pozivom, SMS-om, Viberom ili WhatsApp-om na 060 000 0000, ili preko forme za upit na sajtu. Termini se zakazuju 2-3 dana unapred.",

  fallback:
    "Ako ne znaš odgovor ili pitanje traži medicinski savet, reci da to može da proceni samo terapeut na pregledu i ponudi telefon 060 000 0000. Nikad ne izmišljaj cene, radno vreme ni adresu.",

  allowedOrigins: ["*"],
  greeting:
    "Zdravo! Ja sam asistent Studija Zdrava Leđa. Pitajte me o uslugama ili zakazivanju termina.",
  accentColor: "#2e6b4f",
};
