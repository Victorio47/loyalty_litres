import { loyaltyErrorContext } from "@litres/errors";

export const loyaltyErrorSubcontext = loyaltyErrorContext.subcontext("Loyalty");

export const bonusesForPayingPpdError = loyaltyErrorSubcontext.feature(
  "BonusesForPayingPpd"
);
