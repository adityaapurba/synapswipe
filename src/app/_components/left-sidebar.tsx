"use client";
import { useSetRecoilState } from "recoil";
import { currentDeckAtom } from "~/store/deck";
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

  const setCurrentDeck = useSetRecoilState(currentDeckAtom);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
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
      <div className="cursor-pointer" onClick={() => setCurrentDeck(undefined)}>
        new deck
      </div>
    </div>
  );
}
