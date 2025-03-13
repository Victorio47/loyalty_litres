import React from "react";
import { Icon } from "@litres/ui-kit/icon";
import styles from "./WinkScreens.module.scss";


const WinkInformation = () => {
  return (
    <div className={styles.winkInformation}>
      <p className={styles.winkInformation__price}>
        <span className={styles.winkInformation__price__crossOut}>199 ₽</span>
        <span className={styles.winkInformation__price__highlight}>0 ₽ в месяц</span>
      </p>
      <p>Доступ к Wink будет сохраняться, пока активна ваша Литрес Подписка</p>
    </div>
  );
};

export const SubscribeWinkScreen = () => {
  return (
    <div className={styles.winkScreen}>
      <div className={styles.winkScreen__content}>
        <div className={styles.winkScreen__logoWink}>
          <Icon name="wink" path="loyalty" />
        </div>
        <ul className={styles.winkScreen__list}>
          <li className={styles.winkScreen__listItem}>Более 130 ТВ-каналов</li>
          <li className={styles.winkScreen__listItem}>
            Тысячи фильмов и сериалов на любой вкус
          </li>
        </ul>
        <p>
          Для бесплатной подписки онлайн-кинотеатра Wink, зарегистрируйтесь на
          Wink.ru под тем же номером телефона, который вы используете в Литрес
        </p>
      </div>

      <WinkInformation />
    </div>
  );
};
