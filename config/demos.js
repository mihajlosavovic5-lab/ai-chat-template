// Registar demo konfiguracija. Koristi se samo kad je ENABLE_DEMOS=1
// (jedan deploy opslužuje više demoa preko data-client u widgetu).
// Za pravog klijenta NE postavljaj ENABLE_DEMOS.
import salon from "./business.js";
import ordinacija from "../clients/demo-ordinacija/business.js";
import ordinacijaEn from "../clients/demo-ordinacija-en/business.js";
import advokatEn from "../clients/demo-advokat-en/business.js";
import advokat from "../clients/demo-advokat/business.js";

export default { salon, ordinacija, "ordinacija-en": ordinacijaEn, advokat, "advokat-en": advokatEn };
