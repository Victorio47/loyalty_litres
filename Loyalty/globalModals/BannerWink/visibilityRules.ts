import type { ParsedUrlQuery } from "querystring";
import type { IFoundationUserState } from "@litres-core/store";
import { checkVarioqubFlags } from "@litres-libs/global-hooks";
import { getFromLocalStorage, hasWindow } from "@litres/utils";
import { WINK_SUBSCRIBED_KEY } from "../../Modals/WinkModal";
import { STORAGE_WINK_KEY, FORCE_BANNER_WINK_KEY } from "./constants";

interface IcheckIfBannerWinkShouldBeShownParams {
  foundationUserState: IFoundationUserState;
  isPageWithHeader: boolean;
  routerQuery: ParsedUrlQuery;
}
export const checkIfBannerWinkShouldBeShown = ({
  foundationUserState,
  isPageWithHeader,
  routerQuery,
}: IcheckIfBannerWinkShouldBeShownParams) => {
  if (!hasWindow) {
    return null;
  }
  // Проверяем есть ли подписка wink
  const isNotSubscribedWink = !getFromLocalStorage(WINK_SUBSCRIBED_KEY);
  // Если есть аб по wink то добавляем глобальную модалку или через query параметр
  const isWinkEnabledTest =
    checkVarioqubFlags(
      foundationUserState.varioqubTests.flags,
      "is_wink_enabled",
      "true"
    ) || Boolean(routerQuery[FORCE_BANNER_WINK_KEY]);

  if (foundationUserState.id === 0 || !isWinkEnabledTest) {
    return false;
  }

  const hasUserBeenSubscribedFor7Days = hasBeenSubscribedForDays(
    foundationUserState.subscription.start_date,
    7
  );

  // Не показывался баннер последние 30 дней
  const showingInterval = 30 * 24 * 60 * 60 * 1000; // 30 дней в миллисекундах
  const isNotShownRecently = !checkIfBannerWasShownRecently(
    STORAGE_WINK_KEY,
    showingInterval
  );
  const isActiveSubscription = foundationUserState.subscription.is_active;

  // Условия для показа Wink модалки
  const shouldBeShown =
    isPageWithHeader &&
    hasUserBeenSubscribedFor7Days &&
    isNotShownRecently &&
    isActiveSubscription &&
    isNotSubscribedWink;
  return shouldBeShown;
};

// Функция для проверки, показывался ли баннер недавно (на основе localStorage)
const checkIfBannerWasShownRecently = (
  storageKey: string,
  interval: number
): boolean => {
  const lastShownTime = getFromLocalStorage(storageKey);

  if (!lastShownTime) {
    return false; // Если нет записи в localStorage, баннер не показывался
  }

  const currentTime = Date.now();
  const timeSinceLastShown = currentTime - Number(lastShownTime);

  return timeSinceLastShown < interval;
};

// Функция для проверки сколько времени прошло с момента начала подписки
const hasBeenSubscribedForDays = (
  subscriptionStartTime: string | null | undefined,
  days: number
): boolean => {
  if (!subscriptionStartTime) return false;

  const currentTimeInMs = Date.now();
  const subscriptionStartTimeInMs = new Date(
    subscriptionStartTime + "Z"
  ).getTime();
  const daysInMs = days * 24 * 60 * 60 * 1000; // Количество миллисекунд в днях

  // Проверяем, прошли ли требуемое количество дней
  return currentTimeInMs - subscriptionStartTimeInMs >= daysInMs;
};
