import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const cardType = z.enum(["TEXT", "CODE", "OPTION", "IMAGE"]);

export const cardRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        type: cardType,
        deckId: z.string(),
        content: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const card = await ctx.db.card.create({
        data: {
          type: input.type,
          content: input.content,
          deckId: input.deckId,
        },
      });
      await ctx.db.cardProgress.create({
        data: {
          cardId: card.id,
        },
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(async ({ ctx, input }) => {
      const cards = await ctx.db.card.findMany({
        where: {
          deckId: input.deckId,
        },
      });
      return cards;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      });
    }),
});
