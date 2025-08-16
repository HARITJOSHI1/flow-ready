import { z, ZodIssue } from "zod";

// ts def for private env's exclucidng NEXT_PUBLIC_ env 's
export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  DATABASE_URL: z.string(),
  CLERK_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
});

// to make env type defs globally available by using process.env
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

const constructEnvErrorMessages = (errors: ZodIssue[]): string[] => {
  return errors.map((error, idx) => {
    return `${idx + 1}) ${error.path.join(".")} : ${error.message}`;
  });
};

// Register and validate environment variables at startup
export async function register() {
  const envValidationResult = envSchema.safeParse(process.env);

  if (envValidationResult.error) {
    const errorMessages = constructEnvErrorMessages(
      envValidationResult.error.errors
    );
    throw new Error(
      `\n\n❌ Error in loading environment variables:\n${errorMessages.join(
        "\n"
      )}\n`
    );
  }

  console.info("✅ Environment variables loaded successfully");
}
