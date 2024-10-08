import { z } from 'zod';

export const SubscribeRequestSchema = z.object({
  email: z.string().email(),
});

export type SubscribeRequest = z.infer<typeof SubscribeRequestSchema>;

export const UnsubscribeRequestSchema = z.object({
  email: z.string().email(),
});

export type UnsubscribeRequest = z.infer<typeof UnsubscribeRequestSchema>;
