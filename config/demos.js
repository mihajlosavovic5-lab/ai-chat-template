// Demo configuration registry. Used only when ENABLE_DEMOS=1
// (one deploy serves several demos via data-client in the widget).
// Do NOT set ENABLE_DEMOS for a real client.
import salon from "./business.js";
import ordinacija from "../clients/demo-ordinacija/business.js";
import advokat from "../clients/demo-advokat/business.js";

export default {
  salon,
  ordinacija,
  "ordinacija-en": ordinacija, // old URL alias
  advokat,
  "advokat-en": advokat, // old URL alias
};
