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
      return ctx.db.card.create({
        data: {
          type: input.type,
          content: input.content,
          deckId: input.deckId,
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
});
