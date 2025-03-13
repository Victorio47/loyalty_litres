import React, { useEffect } from "react";
import { useBoolean } from "usehooks-ts";
import { Button } from "@litres/ui-kit/button";
import cn from "classnames";
import { FunctionalButton } from "@litres/ui-kit/functional-button";
import { SpriteIcon } from "@litres-libs/sprite-icons";
import { Icon } from "@litres/ui-kit/icon";
import { LazyBuyPaperBooksModal } from "@features/Loyalty";
import { TM } from "@utils/analytics";
import { WinkModal, WinkSteps } from "../../Modals/WinkModal";
import styles from "./BenefitsWidget.module.scss";
interface IWinkWidgetProps {
  isSuccess?: boolean;
  onClick: () => void;
}

interface IHowToUseButtonProps {
  onClick: () => void;
}
const HowToUseButton = ({ onClick }: IHowToUseButtonProps) => {
  return (
    <FunctionalButton
      className={styles.benefitsWidget__moreDetailedButton}
      size="medium"
      onClick={onClick}
    >
      Как воспользоваться
    </FunctionalButton>
  );
};

export const ChitaiGorodWidget = () => {
  const {
    setTrue: openModal,
    value: isModalOpen,
    setFalse: closeModal,
  } = useBoolean(false);
  return (
    <div className={styles.benefitsWidget}>
      <Icon name="chitaiGorod" path="loyalty" />
      <div className={styles.benefitsWidget__description}>
        <span className={styles.benefitsWidget__description__text}>
          Скидка 30% на бумажные книги
        </span>
        <span>в «Читай-городе»</span>
      </div>
      <HowToUseButton onClick={openModal} />
      <LazyBuyPaperBooksModal isModalOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
export const WinkWidget = ({ isSuccess, onClick }: IWinkWidgetProps) => {
  return (
    <div
      className={cn(styles.benefitsWidget, {
        [styles.benefitsWidget_green]: isSuccess,
      })}
    >
      <header className={styles.benefitsWidget__header}>
        <Icon
          name="wink"
          path="loyalty"
          className={styles.benefitsWidget__winkIcon}
        />
        {isSuccess && (
          <div className={styles.benefitsWidget__successBlock}>
            <span className={styles.textGreen}>Успешно подключено</span>
            <SpriteIcon name="check" size={16} />
          </div>
        )}
      </header>
      <ul className={styles.benefitsWidget__list}>
        <li className={styles.benefitsWidget__listItem}>
          Более 130 ТВ-каналов
        </li>
        <li className={styles.benefitsWidget__listItem}>
          Тысячи фильмов и сериалов на любой вкус
        </li>
      </ul>
      {isSuccess ? (
        <HowToUseButton onClick={onClick} />
      ) : (
        <Button
          className={styles.benefitsWidget__buttonWink}
          mode="primary"
          text="Подключить Wink бесплатно"
          size="small"
          onClick={onClick}
        />
      )}
    </div>
  );
};
