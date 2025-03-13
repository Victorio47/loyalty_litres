import React from "react";
import cn from "classnames";
import { Switcher } from "@litres/ui-kit/switcher";
import { SpriteIcon } from "@litres-libs/sprite-icons";
import { getDeclination } from "@litres/utils";
import styles from "./BonusDeductToggle.module.scss";

interface IBonusDeductToggle {
  bonus: number;
  checked: boolean;
  isDisabledView?: boolean;
  onToggle: () => void;
}
export const BonusDeductToggle = ({
  bonus,
  checked,
  onToggle,
  isDisabledView = false,
}: IBonusDeductToggle) => {
  return (
    <div
      className={cn(styles.bonusDeductToggle, {
        [styles.bonusDeductToggle__isDisabledView]: isDisabledView,
      })}
    >
      {!isDisabledView && (
        <>
          <div className={styles.bonusDeductToggle__leftSide}>
            <p>
              <SpriteIcon name="bonus" size={16} />
              <span className={styles.bonusDeductToggle__text}>
                Списать {bonus}{" "}
                {getDeclination(bonus, ["бонус", "бонуса", "бонусов"])}{" "}
                «Книголов»
              </span>
            </p>
            <div className={styles.bonusDeductToggle__bottomText}>
              <p>При оплате российской</p>
              <p>банковской картой</p>
            </div>
          </div>
          <Switcher checked={checked} onChange={onToggle} />
        </>
      )}
    </div>
  );
};
