import { atom } from "recoil";

export const isMobileAtom = atom<boolean>({
  key: "isMobile",
  default: false,
});

export const isSidebarOpenAtom = atom<boolean>({
  key: "isSidebarOpen",
  default: true,
});
