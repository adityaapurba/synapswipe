import { type CardProgress } from "@prisma/client";

export default function calculateScore(cardProgress: CardProgress): number {
  const baseScore =
    (((cardProgress.difficulty * 3) / 10) * cardProgress.importance * 4) / 10;
  const successRate =
    cardProgress.totalRevisions > 0
      ? cardProgress.totalCorrectRevisions / cardProgress.totalRevisions
      : 0;

  let score = baseScore * (2 - successRate);
  const revisionScore = Math.max(
    1 - cardProgress.consecutiveCorrectRevisions * 0.1,
    0,
  );
  score = score * (1 + revisionScore);

  const lastRevisedDays = Math.round(
    (Date.now() - cardProgress.lastRevised.getTime()) / (1000 * 60 * 60 * 24),
  );
  const decayFactor = 0.9;
  const timeBoost = 1 + (1 - decayFactor ** lastRevisedDays);
  score = score * timeBoost;

  return score;
}
