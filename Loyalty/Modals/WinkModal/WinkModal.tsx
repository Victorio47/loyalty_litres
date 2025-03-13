import React, { useEffect, useState } from "react";
import { Modal } from "@litres/ui-kit/modal";
import { Button } from "@litres/ui-kit/button";
import { subscriptionsApi } from "@litres-core/store";
import { SmartLink } from "@litres-modules/smart-link";
import { useUserInfo } from "@acquisition/UserCredentialsPage/hooks";
import { TM } from "@utils/analytics";
import { PhoneNumberForm } from "./PhoneNumberForm";
import styles from "./WinkModal.module.scss";
import { PrivilegesScreen, SubscribeWinkScreen } from "./WinkScreens";

export enum WinkSteps {
  PRIVILEGES = "privileges",
  SUBSCRIBE_WINK = "subscribeWink",
  SUBSCRIBED_WINK_SUCCESSFUL = "subscribedWinkSuccessful",
  WATCH_WINK = "watchWink",
  ADDED_PHONE_NUMBER = "addedPhoneNumber",
}

interface IButtonSetup {
  text: string;
  mode?: "primary" | "secondary";
}

const buttonSetup: Record<WinkSteps, IButtonSetup> = {
  [WinkSteps.PRIVILEGES]: {
    text: "Отлично",
    mode: "secondary",
  },
  [WinkSteps.SUBSCRIBE_WINK]: {
    text: "Подключить Wink бесплатно",
  },
  [WinkSteps.WATCH_WINK]: {
    text: "Смотреть Wink",
  },
  [WinkSteps.SUBSCRIBED_WINK_SUCCESSFUL]: {
    text: "Отлично",
  },
  [WinkSteps.ADDED_PHONE_NUMBER]: {
    text: "",
  },
};

interface IWinkModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  initialStep?: WinkSteps;
}
export const WINK_SUBSCRIBED_KEY = "winkSubscribed";

export const WinkModal = ({
  isModalOpen,
  onClose,
  initialStep,
}: IWinkModalProps) => {
  const { phoneNumber, isPhoneNumberConfirmed } = useUserInfo();

  const [currentStep, setCurrentStep] = useState<WinkSteps>(
    initialStep || WinkSteps.PRIVILEGES
  );
  // Константы для проверки шагов
  const isPrivileges = currentStep === WinkSteps.PRIVILEGES;
  const isSubscribeWink = currentStep === WinkSteps.SUBSCRIBE_WINK;
  const isSubscribedWinkSuccessful =
    currentStep === WinkSteps.SUBSCRIBED_WINK_SUCCESSFUL;
  const isWatchWink = currentStep === WinkSteps.WATCH_WINK;
  const isAddedPhoneNumber = currentStep === WinkSteps.ADDED_PHONE_NUMBER;
  const [isShowPhoneForm, setIsShowPhoneForm] = useState(!phoneNumber);
  useEffect(() => {
    setIsShowPhoneForm(!phoneNumber || !isPhoneNumberConfirmed);
  }, [phoneNumber, isPhoneNumberConfirmed]);

  // Хук для отправки аналитики при появление какого либо экрана
  useEffect(() => {
    if (!isModalOpen) {
      return;
    }
    if (isSubscribeWink) {
      // При открытие экрана SUBSCRIBE_WINK
      TM.sendEvent(["LITRES_TRACKER"], {
        eventType: "view_wink_offer_confirmation",
        params: {
          source_internal: "wink_offer",
        },
      });
    }
    if (isSubscribedWinkSuccessful) {
      // При открытие экрана SUBSCRIBED_WINK_SUCCESSFUL
      TM.sendEvent(["LITRES_TRACKER"], {
        eventType: "view_wink_success",
        params: {
          source_internal: "wink_offer_confirmation",
        },
      });
    }
    if (isWatchWink) {
      // При открытие экрана WATCH_WINK
      TM.sendEvent(["LITRES_TRACKER"], {
        eventType: "view_wink_watch",
        params: {
          source_internal: "wink_success",
        },
      });
    }
  }, [currentStep]);

  const [subscribeToWink, { isLoading, isError, reset }] =
    subscriptionsApi.useSubscribeToWinkMutation();

  const onCloseModal = () => {
    if (isSubscribeWink || isWatchWink) {
      // Аналитика при нажатии на крестик, закрывании модалки
      TM.sendEvent(["LITRES_TRACKER"], {
        eventType: "click_wink_close",
        params: {
          source_internal: isSubscribeWink
            ? "wink_offer_confirmation"
            : "wink_watch",
        },
      });
    }
    setCurrentStep(initialStep || WinkSteps.PRIVILEGES);
    reset();
    onClose();
  };

  // Функция для перехода на следующий этап
  const goToNext = () => {
    if (isPrivileges) {
      setCurrentStep(
        isShowPhoneForm
          ? WinkSteps.ADDED_PHONE_NUMBER
          : WinkSteps.SUBSCRIBE_WINK
      );
    }
    if (isSubscribeWink) {
      if (initialStep === WinkSteps.SUBSCRIBE_WINK && isShowPhoneForm) {
        setCurrentStep(WinkSteps.ADDED_PHONE_NUMBER);
        return;
      }
      if (!isLoading) {
        subscribeToWink()
          .unwrap()
          .then(() => {
            setCurrentStep(WinkSteps.SUBSCRIBED_WINK_SUCCESSFUL);
            localStorage.setItem(WINK_SUBSCRIBED_KEY, "1");
          });
      }
    }
    if (isSubscribedWinkSuccessful) {
      setCurrentStep(WinkSteps.WATCH_WINK);
    }
    if (isWatchWink) {
      window.location.replace(
        "https://redirect.appmetrica.yandex.com/serve/748965907946083841"
      );
    }
    if (isAddedPhoneNumber) {
      setCurrentStep(WinkSteps.SUBSCRIBE_WINK);
      setIsShowPhoneForm(false);
    }
  };

  // Функция для отправки аналитики при клики на главную кнопку
  const sendAnalyticsOnClick = () => {
    if (isSubscribeWink) {
      // Аналитика при нажатии кнопки  "Подключить Wink  бесплатно"  с экрана isSubscribeWink
      TM.sendEvent(["LITRES_TRACKER"], {
        eventType: "click_wink_confirmation",
        params: {
          source_internal: "wink_offer",
        },
      });
    }
    if (isSubscribedWinkSuccessful) {
      // Аналитика при нажатии кнопки  "Отлично"  с экрана успеха
      TM.sendEvent(["LITRES_TRACKER"], {
        eventType: "click_wink_great",
        params: {
          source_internal: "wink_success",
        },
      });
    }
    if (isWatchWink) {
      // Аналитика при нажатии на кнопку  "Смотреть Wink"
      TM.sendEvent(["LITRES_TRACKER"], {
        eventType: "click_wink_watch",
        params: {
          source_internal: "wink_watch",
        },
      });
    }
  };

  // Клик главной кнопки
  const onClickButton = () => {
    sendAnalyticsOnClick();
    // На шаге успешного подключения кнопка переноправляет на главную
    if (isSubscribedWinkSuccessful) {
      window.location.replace("/");
      return;
    }
    goToNext();
  };

  // Клик виджета WinkWidget
  const onClickPrivileges = () => {
    if (isPrivileges) {
      // Аналитика при нажатие на кнопку "Подключить Wink  бесплатно" в виджете
      TM.sendEvent(["LITRES_TRACKER"], {
        eventType: "click_wink_add",
        params: {
          source_internal: "wink_offer_confirmation",
        },
      });
    }
    goToNext();
  };

  // Конфигурация главной кнопки
  const buttonConfig = buttonSetup[currentStep] as IButtonSetup;

  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
      <div className={styles.winkModal}>
        {isAddedPhoneNumber && isShowPhoneForm && (
          <PhoneNumberForm
            hideForm={onCloseModal}
            onSetPhoneSuccess={goToNext}
            subTitle="Чтобы подключить Wink, добавьте номер телефона"
          />
        )}
        {(isPrivileges || isSubscribedWinkSuccessful) && (
          <PrivilegesScreen
            onClick={onClickPrivileges}
            isSuccessful={isSubscribedWinkSuccessful}
          />
        )}

        {(isSubscribeWink || isWatchWink) && <SubscribeWinkScreen />}
        {buttonConfig.text && (
          <Button
            className={styles.subscriptionSuccessScreen__mainButton}
            mode={buttonConfig.mode || "primary"}
            text={buttonConfig.text}
            size="medium"
            onClick={onClickButton}
          />
        )}
        {(isSubscribeWink || isWatchWink) && (
          <p className={styles.winkModal__terms}>
            <span>Нажимая на кнопку вы соглашаетесь с</span>{" "}
            <SmartLink href="/landing/wink-litres-promo/">
              условиями акции
            </SmartLink>
          </p>
        )}
        {isError && (isSubscribeWink || isWatchWink) && (
          <p className={styles.winkModal__error}>
            Что-то пошло не так. Попробуйте еще раз.
          </p>
        )}
      </div>
    </Modal>
  );
};
