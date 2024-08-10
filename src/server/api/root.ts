import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { deckRouter } from "./routers/deck";
import { cardRouter } from "./routers/card";
import { reviseRouter } from "./routers/revise";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  deck: deckRouter,
  card: cardRouter,
  revise: reviseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
