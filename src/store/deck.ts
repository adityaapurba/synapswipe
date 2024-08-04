import { type Deck } from "@prisma/client";
import { atom } from "recoil";

export const currentDeckAtom = atom<Deck | undefined>({
  key: "currentDeck",
  default: undefined,
});
