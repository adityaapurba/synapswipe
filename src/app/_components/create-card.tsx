"use client";
import { type CardType } from "@prisma/client";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { currentDeckAtom } from "~/store/deck";
import { api } from "~/trpc/react";

interface Card {
  type?: CardType;
  content?: string;
}

export function CreateCard() {
  const utils = api.useUtils();

  const [card, setCard] = useState<Card>({ type: undefined, content: "" });

  const currentDeck = useRecoilValue(currentDeckAtom);
  if (!currentDeck) return <div>Please select a deck</div>;

  const createCard = api.card.create.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      setCard({ type: undefined, content: "" });
    },
    retry(failureCount, error) {
      if (failureCount >= 1) {
        alert("Failed to create card " + error.data?.code);
        return false;
      } else return true;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!card.type) {
      alert("Please select a card type");
    } else {
      createCard.mutate({
        type: card.type,
        content: card.content,
        deckId: currentDeck.id,
      });
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Select
          onValueChange={(value: string) =>
            setCard({ ...card, type: value as CardType })
          }
          value={card.type}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Content Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TEXT">TEXT</SelectItem>
            <SelectItem value="CODE">CODE</SelectItem>
            <SelectItem value="OPTION">OPTION</SelectItem>
            <SelectItem value="IMAGE">IMAGE</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          value={card.content}
          placeholder="Card content"
          onChange={(e) => setCard({ ...card, content: e.target.value })}
          required
        />
        <Button type="submit" disabled={createCard.isPending} variant="outline">
          {createCard.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
