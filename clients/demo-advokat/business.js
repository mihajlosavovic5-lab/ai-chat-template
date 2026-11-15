// DEMO: izmisljena advokatska kancelarija (nijedna stvarna osoba, firma ni broj).
// Primer configa za pravnu delatnost: asistent NE daje pravne savete.

export default {
  name: "Advokatska kancelarija Pravda Plus",
  assistantName: "Asistent kancelarije Pravda Plus",
  tone: "ljubazan, uljudan i profesionalan, bez pravnih saveta (maksimalno 2-3 rečenice)",

  languages: ["Serbian (Latin script, Ekavian)", "English"],

  about:
    "Izmišljena advokatska kancelarija za demo, sa sedištem u izmišljenom gradu. Bavi se porodičnim pravom, nepokretnostima, ugovorima, radnim pravom i parnicama. Asistent NE daje pravne savete, mišljenja o konkretnim slučajevima niti procenu izgleda na sudu; za to je potreban pregled slučaja kod advokata na konsultaciji.",

  hours: "Ponedeljak-petak 09:00-17:00, vikendom zatvoreno. Konsultacije samo uz zakazivanje.",
  address: "Ulica Primera 1, Demo grad, Srbija",
  phone: "060 000 0001",
  email: "kancelarija@pravdaplus.example",

  services: [
    { name: "Prva konsultacija (procena slučaja)", price: "3.000 RSD (30 min)" },
    { name: "Porodično pravo (razvod, starateljstvo, izdržavanje)", price: "od 40.000 RSD, zavisi od složenosti" },
    { name: "Nepokretnosti (kupoprodaja, provera dokumentacije, ugovori)", price: "od 25.000 RSD" },
    { name: "Izrada i pregled ugovora", price: "od 10.000 RSD" },
    { name: "Radno pravo (otkazi, ugovori o radu, naknade)", price: "od 20.000 RSD" },
    { name: "Zastupanje u parnici", price: "po dogovoru, nakon konsultacije" },
  ],

  faq: [
    {
      q: "Kako zakazujem konsultaciju?",
      a: "Pozivom na 060 000 0001 ili mejlom na kancelarija@pravdaplus.example. Konsultacije traju 30 minuta i koštaju 3.000 RSD.",
    },
    {
      q: "Šta da ponesem na konsultaciju?",
      a: "Svu dokumentaciju vezanu za slučaj (ugovore, rešenja, prepisku), kao i ličnu kartu.",
    },
    {
      q: "Da li je prva konsultacija poverljiva?",
      a: "Da, sve što podelite na konsultaciji je obuhvaćeno advokatskom tajnom. U chatu nemojte slati lične podatke ni detalje slučaja.",
    },
  ],

  booking:
    "Konsultacija se zakazuje pozivom na 060 000 0001 ili mejlom na kancelarija@pravdaplus.example.",

  fallback:
    "Ako pitanje traži pravni savet ili procenu konkretnog slučaja, reci da to može samo advokat na konsultaciji i ponudi zakazivanje. Zamoli korisnika da u chatu ne deli lične podatke ni detalje slučaja. Nikad ne izmišljaj cene, rokove ni ishod.",

  allowedOrigins: ["*"],
  greeting:
    "Dobar dan! Ja sam asistent kancelarije Pravda Plus. Mogu da vam kažem više o oblastima rada, cenama i zakazivanju konsultacije.",
  accentColor: "#1f3a5f",
};
