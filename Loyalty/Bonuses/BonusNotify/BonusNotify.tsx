// BonusNotify.tsx
import React from "react";
import styles from "./BonusNotify.module.scss";

interface IBonusNotifyProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const BonusNotify = ({
  title,
  message,
  buttonText,
  onButtonClick,
}: IBonusNotifyProps) => {
  return (
    <div className={styles.bonusNotify}>
      {title && <h4 className={styles.bonusNotify__title}>{title}</h4>}
      {message && <p className={styles.bonusNotify__description}>{message}</p>}
      {buttonText && onButtonClick && (
        <button className={styles.bonusNotify__button} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};
