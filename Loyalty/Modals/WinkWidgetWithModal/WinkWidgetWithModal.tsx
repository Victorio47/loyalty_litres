import {useBoolean} from "usehooks-ts";
import React, {useEffect} from "react";
import {TM} from "@utils/analytics";
import {WinkModal, WinkSteps} from "../WinkModal";
import { WinkWidget } from "../../Widgets/BenefitsWidgets";

export const WinkWidgetWithModal = () => {
  const {
    setTrue: openWinkModal,
    value: isOpenModalWink,
    setFalse: closeWinkModal,
  } = useBoolean(false);

  // Аналитика при при открытии экрана с предложением подключения wink
  useEffect(() => {
    TM.sendEvent(["LITRES_TRACKER"], {
      eventType: "view_wink_offer",
      params: {
        source_internal: "subscription_landing",
      },
    });
  }, []);

  const onClickWinkWidget = () => {
    openWinkModal();
    // Аналитика при нажатие на кнопку "Подключить Wink  бесплатно" в виджите
    TM.sendEvent(["LITRES_TRACKER"], {
      eventType: "click_wink_add",
      params: {
        source_internal: "wink_offer",
      },
    });
  };
  return (
    <>
      <WinkWidget onClick={onClickWinkWidget} />
      <WinkModal
        isModalOpen={isOpenModalWink}
        onClose={closeWinkModal}
        initialStep={WinkSteps.SUBSCRIBE_WINK}
      />
    </>
  );
};