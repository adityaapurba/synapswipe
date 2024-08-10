"use client";
import { useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { currentDeckAtom } from "~/store/deck";
import { isMobileAtom, isSidebarOpenAtom } from "~/store/mesure";
import { api } from "~/trpc/react";

export function LeftSidebar() {
  const { data, isLoading, error } = api.deck.getAll.useQuery(undefined, {
    retry(failureCount, error) {
      if (failureCount >= 1) {
        alert("Failed to get decks " + error.data?.code);
        return false;
      } else return true;
    },
  });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenAtom);
  const setCurrentDeck = useSetRecoilState(currentDeckAtom);
  const isMobile = useRecoilValue(isMobileAtom);
  useOutsideClick(sidebarRef, () => setIsSidebarOpen(false));

  if (!isSidebarOpen) return null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div
      ref={sidebarRef}
      className={`h-screen transform transition-transform duration-700 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${isMobile ? "w-full" : "w-[20%]"}`}
    >
      <h2 className="p-4 text-xl font-bold">Sidebar</h2>
      <div className="flex flex-col gap-4 p-8">
        {data?.map((deck) => (
          <div
            key={deck.id}
            onClick={() => setCurrentDeck(deck)}
            className="cursor-pointer"
          >
            {deck.name} : {deck.description}
          </div>
        ))}
        <div
          className="cursor-pointer"
          onClick={() => setCurrentDeck(undefined)}
        >
          new deck
        </div>
      </div>
    </div>
  );
}
