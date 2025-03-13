import React, { type ReactNode } from "react";
import { Popover } from "@litres/ui-kit/popover";
import styles from "./Tooltip.module.scss";

interface ITooltipProps {
  text: string;
  children: ReactNode;
}

export const Tooltip = ({ text, children }: ITooltipProps) => {
  return (
    <Popover
      content={<p className={styles.tooltip__text}>{text}</p>}
      contentClassName={styles.tooltip}
      trigger={["hover"]}
      customCloseTriggers={["esc", "focusLost"]}
      placement="top"
      offset={[10, 12]}
      timer={20000}
      disableArrow
    >
      <div className={styles.tooltip__content}>{children}</div>
    </Popover>
  );
};
