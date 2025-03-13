import React from "react";
import { Icon } from "@litres/ui-kit/icon";
import { ChitaiGorodWidget } from "@features/Loyalty";
import { WinkWidget } from "../../../Widgets/BenefitsWidgets";
import styles from "./WinkScreens.module.scss";

interface IPrivilegesScreen {
  onClick: () => void;
  isSuccessful?: boolean;
}
export const PrivilegesScreen = ({
  onClick,
  isSuccessful,
}: IPrivilegesScreen) => {
  return (
    <div className={styles.winkScreen}>
      <Icon name="litresSubscribe" path="loyalty" />
      <h3 className={styles.winkScreen__title}>
        Используйте все <div>возможности подписки</div>
      </h3>
      <div className={styles.winkScreen__subtitle}>Ваши привилегии:</div>
      <ChitaiGorodWidget />
      <WinkWidget isSuccess={isSuccessful} onClick={onClick} />
    </div>
  );
};
