// Demo configuration registry. Used only when ENABLE_DEMOS=1
// (one deploy serves several demos via data-client in the widget).
// Do NOT set ENABLE_DEMOS for a real client. English is the default;
// "-sr" keys are the Serbian versions.
import salon from "./business.js";
import salonSr from "../clients/demo-salon-sr/business.js";
import ordinacija from "../clients/demo-ordinacija/business.js";
import ordinacijaSr from "../clients/demo-ordinacija-sr/business.js";
import advokat from "../clients/demo-advokat/business.js";
import advokatSr from "../clients/demo-advokat-sr/business.js";

export default {
  salon,
  "salon-sr": salonSr,
  ordinacija,
  "ordinacija-en": ordinacija, // old URL alias
  "ordinacija-sr": ordinacijaSr,
  advokat,
  "advokat-en": advokat, // old URL alias
  "advokat-sr": advokatSr,
};
