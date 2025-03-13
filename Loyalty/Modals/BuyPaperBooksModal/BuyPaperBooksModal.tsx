import React from "react";
import { Modal } from "@litres/ui-kit/modal";
import { StyledLink } from "@litres/ui-kit/styled-link";
import { useTranslation, Trans } from "@litres-libs/i18n";
import { checkIfMobileViewport } from "@litres-libs/global-styles";
import styles from "./BuyPaperBooksModal.module.scss";

interface IBuyPaperBooksModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const BUY_PAPER_BOOKS_PARTNER = {
  name: {
    imenitelnyPadezh: "Читай-Город",
    roditelnyPadezh: "Читай-Городе",
  },
  link: "https://www.chitai-gorod.ru/catalog/books-18030",
};

export const BuyPaperBooksModal = (
  props: IBuyPaperBooksModalProps
): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={props.isModalOpen}
      title={t(
        "Для того чтобы получить постоянную скидку 30% в Читай-Город, необходимо выполнить всего два условия:"
      )}
      onClose={props.onClose}
      isMobile={checkIfMobileViewport()}
      closeOnClickOutside
    >
      <ol className={styles.conditionsList}>
        <li>
          <Trans
            i18nKey="Быть участником <linkTag>единой программы лояльности Книголов.</linkTag>"
            components={{
              linkTag: <StyledLink href="/me/bonuses/" target="_blank" />,
            }}
          />
          {t("")}
        </li>
        <li>{t("Активировать услугу подписки.")}</li>
      </ol>
      <p className={styles.profitDescription}>
        <Trans
          i18nKey="Готово! Теперь вы можете оформлять заказы на бумажные книги со скидкой в любом офлайн магазине или в интернет-магазине <linkTag>{name}</linkTag>"
          components={{
            linkTag: (
              <StyledLink href={BUY_PAPER_BOOKS_PARTNER.link} target="_blank" />
            ),
          }}
          values={{ name: BUY_PAPER_BOOKS_PARTNER.name.imenitelnyPadezh }}
        />
      </p>
    </Modal>
  );
};
