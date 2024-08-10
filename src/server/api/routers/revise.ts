import { z } from "zod";
import { type Card, type CardProgress } from "@prisma/client";

export interface CardWithProgress extends Card {
  cardProgress: CardProgress;
}

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import calculateScore from "../utils/calculateScore";

export const reviseRouter = createTRPCRouter({
  cards: protectedProcedure
    .input(z.object({ deckId: z.string(), count: z.number() }))
    .query(async ({ ctx, input }): Promise<CardWithProgress[]> => {
      const deck = await ctx.db.deck.findFirst({
        where: {
          id: input.deckId,
          userId: ctx.session.user.id,
        },
        include: {
          cards: {
            include: {
              cardProgress: true,
            },
            orderBy: {
              cardProgress: {
                score: "desc",
              },
            },
            take: input.count,
          },
        },
      });

      if (!deck) throw new Error("Deck not found");
      console.log(deck.cards);
      return deck.cards as CardWithProgress[];
    }),

  update: protectedProcedure
    .input(
      z.object({
        cardId: z.string(),
        lastRevised: z.date().optional(),
        consecutiveCorrectRevisions: z.number().optional(),
        difficulty: z.number().optional(),
        importance: z.number().optional(),
        totalCorrectRevisions: z.number().optional(),
        totalIncorrectRevisions: z.number().optional(),
        totalRevisions: z.number().optional(),
      }),
    )

    .mutation(async ({ ctx, input }) => {
      const cardProgress = await ctx.db.cardProgress.findFirst({
        where: {
          cardId: input.cardId,
        },
      });

      if (!cardProgress) throw new Error("Card progress not found");

      await ctx.db.cardProgress.update({
        where: {
          cardId: input.cardId,
        },
        data: {
          consecutiveCorrectRevisions: input.consecutiveCorrectRevisions,
          difficulty: input.difficulty,
          importance: input.importance,
          lastRevised: input.lastRevised,
          totalCorrectRevisions: input.totalCorrectRevisions,
          totalIncorrectRevisions: input.totalIncorrectRevisions,
          totalRevisions: input.totalRevisions,
          score: calculateScore({
            ...cardProgress,
            consecutiveCorrectRevisions:
              input.consecutiveCorrectRevisions ??
              cardProgress.consecutiveCorrectRevisions,
            difficulty: input.difficulty ?? cardProgress.difficulty,
            importance: input.importance ?? cardProgress.importance,
            totalCorrectRevisions:
              input.totalCorrectRevisions ?? cardProgress.totalCorrectRevisions,
            totalIncorrectRevisions:
              input.totalIncorrectRevisions ??
              cardProgress.totalIncorrectRevisions,
            totalRevisions: input.totalRevisions ?? cardProgress.totalRevisions,
            lastRevised: input.lastRevised ?? cardProgress.lastRevised,
          }),
        },
      });
      return true;
    }),
});
