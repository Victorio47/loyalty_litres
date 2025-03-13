import type { ParsedUrlQuery } from "querystring";
import type { IFoundationUserState } from "@litres-core/store";
import { getFromLocalStorage, hasWindow } from "@litres/utils";
import { STORAGE_NEW_LOYALTY_PROGRAM_MODAL_KEY } from "./constants";

interface ICheckIfNewLoyaltyProgramModalShouldBeShown {
  foundationUserState: IFoundationUserState;
  isPageWithHeader: boolean;
  routerQuery: ParsedUrlQuery;
}
export const checkIfNewLoyaltyProgramModalShouldBeShown = ({
  foundationUserState,
}: ICheckIfNewLoyaltyProgramModalShouldBeShown) => {
  if (!hasWindow) {
    return null;
  }

  const isNotShownRecently = !checkIfBannerWasShown(
    STORAGE_NEW_LOYALTY_PROGRAM_MODAL_KEY
  );

  const isAbTest = checkIfAbTest(foundationUserState.ab_tests, 1228);
  const shouldBeShown = isNotShownRecently && isAbTest;
  return shouldBeShown;
};

// Функция для проверки, показывался ли баннер (на основе localStorage)
const checkIfBannerWasShown = (storageKey: string): boolean => {
  const lastShownTime = getFromLocalStorage(storageKey);
  return !!lastShownTime; // Если нет записи в localStorage, баннер не показывался
};

const checkIfAbTest = (
  abTests: IFoundationUserState["ab_tests"],
  testNumber: number
) => {
  const testGroup = abTests.filter(test => test.id === testNumber);
  return testGroup && testGroup.length > 0 && testGroup[0].group === "test";
};
