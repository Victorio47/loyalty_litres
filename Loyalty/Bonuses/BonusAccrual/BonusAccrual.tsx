import React from "react";
import { SpriteIcon } from "@litres-libs/sprite-icons";
import styles from "./BonusAccrual.module.scss";
interface BonusAccrualProps {
  bonus: number;
}

export const BonusAccrual = ({ bonus }: BonusAccrualProps) => {
  return (
    <div className={styles.bonusAccrual}>
      <p>Начислим</p>
      <p className={styles.bonusAccrual__bonus}>+{bonus}</p>
      <SpriteIcon name="bonus" size={16} />
    </div>
  );
};
