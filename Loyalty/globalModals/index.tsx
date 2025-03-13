import { LazyBannerWink, checkIfBannerWinkShouldBeShown } from "./BannerWink";
import {
  LazyNewLoyaltyProgramModal,
  checkIfNewLoyaltyProgramModalShouldBeShown,
} from "./NewLoyaltyProgramModal";

export const loyaltyGlobalModals = [
  {
    checkIfShouldBeShown: checkIfBannerWinkShouldBeShown,
    component: LazyBannerWink,
    name: "BannerWink",
  },
  {
    checkIfShouldBeShown: checkIfNewLoyaltyProgramModalShouldBeShown,
    component: LazyNewLoyaltyProgramModal,
    name: "NewLoyaltyProgramModal",
  },
];
