import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import { Modal } from "@litres/ui-kit/modal";
import { Button } from "@litres/ui-kit/button";
import SmartLink from "@litres-modules/smart-link";
import { useAppSelector } from "@litres-core/store";
import { AddNewPhonePopup } from "@litres/auth/user";

import { TM } from "@utils/analytics";
import newLoyaltyModalPng from "@images/banners/newLoyaltyModal.png";
import newLoyaltyModalDesktopPng from "@images/banners/newLoyaltyModalDesktop.png";
import litresChitaygorodBukvoedPng from "@images/banners/partners/litres_chitaygorod_bukvoed.png";
import { STORAGE_NEW_LOYALTY_PROGRAM_MODAL_KEY } from "./constants";
import styles from "./NewLoyaltyProgramModal.module.scss";

const updateModalShownTime = () => {
  const currentTime = Date.now();
  localStorage.setItem(
    STORAGE_NEW_LOYALTY_PROGRAM_MODAL_KEY,
    String(currentTime)
  );
};
const NewLoyaltyProgramModal = () => {
  const phoneNumber = useAppSelector(
    state => state.foundationUser.phone.number
  );
  const isPDA = useAppSelector(state => state.browser.pda);
  const [isOpen, setOpen] = useState(true);
  const [needToAddPhone, setNeedToAddPhone] = useState(false);
  const router = useRouter();

  const onCloseModal = () => {
    setOpen(false);
    // Аналитика при нажатии на крестик, закрывании модалки
    TM.sendEvent(["LITRES_TRACKER"], {
      eventType: "new_loyalty_modal_close",
      params: {},
    });
  };

  // Отправляем аналитику при открытии глобальной модалки с новой программой лояльности
  useEffect(() => {
    TM.sendEvent(["LITRES_TRACKER"], {
      eventType: "new_loyalty_modal_shown",
      params: {},
    });
    updateModalShownTime();
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        customClass={cn(styles.newLoyaltyProgramModal, {
          [styles.newLoyaltyProgramModal_mobile]: !isPDA,
        })}
        customHeaderClass={styles.newLoyaltyProgramModal__header}
        isMobile={isPDA}
        width={isPDA ? undefined : 560}
      >
        <div className={styles.newLoyaltyProgramModal__content}>
          <img
            className={cn(styles.newLoyaltyProgramModal__content__image, {
              [styles.newLoyaltyProgramModal__content__image_mobile]: isPDA,
            })}
            src={isPDA ? newLoyaltyModalPng : newLoyaltyModalDesktopPng}
            alt="new loyalty modal"
            loading="lazy"
          />
          <h2>Читайте больше c единой бонусной программой «Книголов»</h2>
          <p className={styles.newLoyaltyProgramModal__content__info}>
            {
              "Копите бонусы с кешбэком до 15% и оплачивайте до 99% от стоимости покупки в Литрес, Читай\u2011городе и Буквоеде"
            }
          </p>
          <Button
            mode="primary"
            type="button"
            size="medium"
            text={phoneNumber ? "Перейти к покупкам" : "Получать бонусы"}
            fullWidth
            className={styles.newLoyaltyProgramModal__content__button}
            onClick={() => {
              setOpen(false);
              if (phoneNumber) {
                router.push("/recommended/");
              } else {
                setNeedToAddPhone(true);
              }
            }}
          />
          <Button
            mode="tertiary"
            type="button"
            size="small"
            text="Подробнее о программе"
            fullWidth
            href="/me/bonuses/"
          />
          <p className={styles.newLoyaltyProgramModal__content__oferta}>
            {"Используя бонусы, вы соглашаетесь с изменениями условий "}
            <SmartLink href="/pages/litres_oferta/" target="_blank">
              публичной оферты
            </SmartLink>
            {" и "}
            <SmartLink
              href="/static/litres/inc/ru/privacy_policy.html"
              target="_blank"
            >
              политики обработки персональных данных.
            </SmartLink>
          </p>
          <img
            className={cn(styles.newLoyaltyProgramModal__content__bottomImage, {
              [styles.newLoyaltyProgramModal__content__bottomImage_mobile]:
                isPDA,
            })}
            src={litresChitaygorodBukvoedPng}
            alt="litres chitay-gorod bukvoed logos"
            loading="lazy"
          />
        </div>
      </Modal>
      {needToAddPhone && (
        <AddNewPhonePopup
          title="Новый номер телефона"
          subTitle="Чтобы использовать бонусы, добавьте номер телефона"
          onSuccess={() => {
            router.push("/me/bonuses/");
          }}
          onClose={() => {
            setNeedToAddPhone(false);
          }}
        />
      )}
    </>
  );
};

export default NewLoyaltyProgramModal;
