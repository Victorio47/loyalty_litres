import { useBoolean } from "usehooks-ts";
import { useEffect, useMemo, useRef } from "react";
import { useUserSubscriptionForProlongation } from "@monetization/entities/userSubscription/useUserSubscriptionForProlongation";
import { TM } from "@utils/analytics";
import { WinkModal } from "../../Modals/WinkModal";
import { STORAGE_WINK_KEY } from "./constants";

const updateBannerShownTime = (storageKey: string) => {
  const currentTime = Date.now();
  localStorage.setItem(storageKey, String(currentTime));
};

const BannerWink = () => {
  const {
    setTrue: openWinkModal,
    value: isOpenWinkModal,
    setFalse: closeWinkModal,
  } = useBoolean(false);

  const userSubscription = useUserSubscriptionForProlongation();

  const isModalShouldBeShown = useMemo(
    () => userSubscription.loaded && userSubscription.isMonthlySubscription,
    [userSubscription.loaded, userSubscription.isMonthlySubscription]
  );

  const wasAnalyticsSent = useRef(false);

  // Отправляетм аналитику при при открытии глобальной модалки с Wink
  useEffect(() => {
    if (!isModalShouldBeShown) {
      return;
    }

    if (!wasAnalyticsSent.current) {
      TM.sendEvent(["LITRES_TRACKER"], {
        eventType: "view_wink_offer",
        params: {
          source_internal: "subscription_landing",
        },
      });
    }

    openWinkModal();
    updateBannerShownTime(STORAGE_WINK_KEY);

    wasAnalyticsSent.current = true;
  }, [isModalShouldBeShown]);

  if (isModalShouldBeShown) {
    return <WinkModal isModalOpen={isOpenWinkModal} onClose={closeWinkModal} />;
  }
  return null;
};

export default BannerWink;
