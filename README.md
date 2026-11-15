# AI chat asistent za lokalne biznise (template)

Jedan folder = jedan klijent. Menjas samo `config/business.js`.

## Postavljanje za novog klijenta (oko 30-60 min)

1. Kopiraj ceo folder (`ai-chat-template` -> `klijent-ime`)
2. Popuni `config/business.js`: ime, usluge i cene, radno vreme, FAQ, boju
3. Promeni `allowedOrigins` na klijentov domen, npr. `["https://klijent.rs"]`
4. Push na GitHub, importuj u Vercel
5. U Vercel Settings -> Environment Variables dodaj `OPENAI_API_KEY` (poseban kljuc po klijentu, sa mesecnim limitom u OpenAI dashboardu)
6. Na klijentov sajt nalepi pred `</body>`:

```html
<script src="https://klijent-ime.vercel.app/widget/widget.js"
        data-endpoint="https://klijent-ime.vercel.app/api/chat"
        data-title="Ime AI"
        data-greeting="Zdravo! Kako mogu da pomognem?"
        data-color="#c2185b"></script>
```

## Test

`npm test` (bez pravog API ključa, proverava validaciju, rate limit, config -> prompt, odbacivanje ubacenih system poruka).
Za demo uživo: `vercel dev` pa otvori `/demo/index.html`.

## Šta je već ugrađeno

- Samo user/assistant poruke u istoriji (ne može da se ubaci "system")
- Limit: 500 karaktera po poruci, 10 poruka istorije, 20 poruka / 10 min po IP-u
- CORS ograničen na klijentov domen
- Asistent ne izmišlja cene (koristi samo listu iz configa)
- Widget koristi `textContent` (nema XSS)

## Poznata ograničenja (reci klijentu iskreno)

- Rate limit je u memoriji instance, dovoljan za mali sajt, ne za veliki saobraćaj
- Ne zakazuje sam termin, usmerava na telefon ili prikuplja kontakt (booking je posebna, skuplja nadogradnja)
- Odgovori su dobri koliko i podaci u configu, klijent mora da potvrdi cene i FAQ

## Ponuda (predlog)

| | |
|---|---|
| Setup | 150-250 EUR jednokratno (dodatak na sajt) |
| Mesečno | 15-25 EUR (hosting + održavanje + izmene configa) |
| Trošak tebi | OpenAI gpt-4o-mini, obično par EUR mesečno za mali biznis, proveri na svom nalogu |

Prvi klijent: ponudi besplatan pilot 14 dana za testimonial.
