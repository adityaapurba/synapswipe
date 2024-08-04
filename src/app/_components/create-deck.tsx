"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

interface Deck {
  name: string;
  description: string;
}

export function CreateDeck() {
  const utils = api.useUtils();

  const [deck, setDeck] = useState<Deck>({ name: "", description: "" });

  const createDeck = api.deck.create.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      setDeck({ name: "", description: "" });
    },
    retry(failureCount, error) {
      if (failureCount >= 1) {
        alert("Failed to create deck " + error.data?.code);
        return false;
      } else return true;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!deck.name) {
      alert("Please enter a deck name");
    } else {
      createDeck.mutate({
        name: deck.name,
        description: deck.description,
      });
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={deck.name}
          placeholder="Deck name"
          onChange={(e) => setDeck({ ...deck, name: e.target.value })}
          required
        />
        <Input
          type="text"
          value={deck.description}
          placeholder="Deck description"
          onChange={(e) => setDeck({ ...deck, description: e.target.value })}
        />
        <Button type="submit" disabled={createDeck.isPending} variant="outline">
          {createDeck.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
