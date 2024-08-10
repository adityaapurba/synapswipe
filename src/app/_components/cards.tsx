"use client";

import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Button } from "~/components/ui/button";
import { currentDeckAtom } from "~/store/deck";
import { api } from "~/trpc/react";
import { CreateCard } from "./create-card";
import Link from "next/link";

export function Cards() {
  // const allCards
  const currentDeck = useRecoilValue(currentDeckAtom);
  const [showCreateCard, setShowCreateCard] = useState(false);

  if (!currentDeck) return <div>Please select a deck</div>;

  const { data, isLoading, error } = api.card.getAll.useQuery(
    {
      deckId: currentDeck?.id,
    },
    {
      retry(failureCount, error) {
        if (failureCount > 2) {
          alert("Failed to get cards " + error.data?.code);
          return false;
        } else return true;
      },
    },
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      {/* All Cards:
      {data?.map((card) => <div key={card.id}>{card.content}</div>)} */}
      <Link href={"/revise/" + currentDeck?.id}>
        <Button variant="outline">Revise Cards</Button>
      </Link>
      <Button variant="outline" onClick={() => setShowCreateCard(true)}>
        Add New Card
      </Button>
      {showCreateCard && <CreateCard />}
    </div>
  );
}
