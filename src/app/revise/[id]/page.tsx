"use client";

import { usePathname } from "next/navigation";
import { api } from "~/trpc/react";

export default function Revise() {
  const pathName = usePathname().split("/");
  const deckId = pathName[pathName.length - 1];

  if (!deckId) return <div>Please select a deck</div>;

  const { data, isLoading, error } = api.revise.cards.useQuery(
    {
      deckId: deckId,
      count: 10,
    },
    {
      retry(failureCount, error) {
        if (failureCount >= 1) {
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
      {data?.map((card) => (
        <div key={card.id}>
          <div>{card.content}</div>
          <div>Score: {card.cardProgress?.score}</div>
        </div>
      ))}
    </div>
  );
}
