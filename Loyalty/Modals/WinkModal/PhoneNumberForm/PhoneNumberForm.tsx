import React, { useEffect } from "react";
import AuthPopup from "@litres/auth/popup";
import { EAuthStep } from "@litres-libs/types";
import { api, useAppDispatch } from "@litres-core/store";
import styles from "./PhoneNumberForm.module.scss";

interface IPhoneNumberPhone {
  hideForm: () => void;
  onSetPhoneSuccess: () => void;
  subTitle: string;
}
export const PhoneNumberForm = ({
  hideForm,
  onSetPhoneSuccess,
  subTitle,
}: IPhoneNumberPhone) => {
  const dispatch = useAppDispatch();
  // Это форма для добавления номера мобильного телефона, сделаная на основе AuthPopup
  useEffect(() => {
    dispatch(api.global.auth.setActiveStep(EAuthStep.fallbackLogin));
  }, []);
  return (
    <div className={styles.phoneNumberForm}>
      <AuthPopup
        hidePopup={hideForm}
        onSetPhoneSuccess={onSetPhoneSuccess}
        subTitleSetPhone={subTitle}
        isReloadOnSetPhone={false}
      />
    </div>
  );
};
