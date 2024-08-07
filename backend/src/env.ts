import { z } from "zod";
import { fromError } from "zod-validation-error";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const envSchema = z.object({
  EXPRESS_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val < 65536 && !isNaN(val), {
      message: `Invalid port `,
    }),
  NODEMAILER_EMAIL: z.string(),
  NODEMAILER_PASSWORD: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  HASURA_GRAPHQL_ADMIN_SECRET: z.string(),
  HASURA_GRAPHQL_DATABASE_URL: z.string().url(),
  HASURA_GRAPHQL_SERVER_PORT: z.coerce.number(),
  PRIVATE_KEY : z.string(),
  PASSPHRASE : z.string()
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  throw new Error(fromError(parsedEnv.error).message);
}

export const env = parsedEnv.data;
