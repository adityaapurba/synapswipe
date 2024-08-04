"use client";
import { ModeToggle } from "../_components/mode-toggle";
import { CreateDeck } from "../_components/create-deck";
import { LeftSidebar } from "../_components/left-sidebar";
import { currentDeckAtom } from "~/store/deck";
import { useRecoilValue } from "recoil";
import { Cards } from "../_components/cards";

export default function Dashboard() {
  const currentDeck = useRecoilValue(currentDeckAtom);
  return (
    <div className="flex h-screen flex-col">
      <ModeToggle />
      <div className="flex grow bg-red-200">
        <LeftSidebar />
        <div className="grow bg-fuchsia-300">
          {!currentDeck && <CreateDeck />}
          {currentDeck && <Cards />}
        </div>
      </div>
    </div>
  );
}
