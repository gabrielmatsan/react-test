import z from "zod";

export const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_ENABLE_API_DELAY: z.string().transform(value => value === 'true').optional().default(false),
});

export const env = envSchema.parse(import.meta.env);