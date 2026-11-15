# Isporuka novom klijentu (checklist)

## 1. Podaci od klijenta (pitaj u prvoj poruci)
- Naziv firme, čime se bavi, jezici na kojima pišu kupci
- Usluge i cene (tačan spisak, ništa se ne izmišlja)
- Radno vreme, adresa, telefon, mejl
- FAQ: 5-10 pitanja koja kupci najčešće postavljaju
- Šta bot NE sme da kaže (npr. medicinski/pravni saveti)
- Adresa sajta (za `allowedOrigins`) i boja
- Standard/Premium: mejl na koji stižu zahtevi za termin

## 2. Podešavanje (kopija repoa po klijentu)
1. Kopiraj ovaj repo u novi privatni repo (`ime-klijenta-chat`).
2. Popuni `config/business.js` (bez `ENABLE_DEMOS`!). `allowedOrigins` = sajt klijenta, ne `*`.
3. Standard/Premium: otkomentariši `bookingEmail`.
4. `node test.js` mora da prođe.
5. Vercel: novi projekat iz repoa. Env: `OPENAI_API_KEY` (ključ klijenta ili tvoj uz mesečni naplaćen trošak), za booking `RESEND_API_KEY`.
6. `vercel --prod`, otvori `/api/chat` testom iz chata.

## 3. Ugradnja na sajt klijenta
Jedan red pred `</body>`:
```html
<script defer src="https://<projekat>.vercel.app/widget/widget.js"
        data-endpoint="https://<projekat>.vercel.app/api/chat"
        data-title="..." data-greeting="..." data-color="#..."></script>
```

## 4. Test pre isporuke
- Pitanje o ceni, radnom vremenu, nepoznata tema (mora da uputi na kontakt)
- Poruka na drugom jeziku (jezik se drži cele konverzacije)
- Pitanje za savet (medicinski/pravni) mora da odbije
- Booking: ceo tok do mejla (Standard/Premium)

## 5. Posle isporuke
- Klijentu pošalji kratko uputstvo: kako da menja cene (tebi javi izmenu)
- Podseti na troškove AI-ja (OpenAI), mesečno 20 EUR održavanje po dogovoru
- Premium: 30 dana podrške od isporuke
