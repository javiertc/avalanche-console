import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
const server = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  // Add your server-side env vars here
  // AVAX_API_KEY: z.string().min(1),
  // DATABASE_URL: z.string().url(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  // Add your client-side env vars here
  NEXT_PUBLIC_API_URL: z.string().url().optional().default('https://api.avax.network'),
  NEXT_PUBLIC_METRICS_API_URL: z.string().url().optional().default('https://metrics.avax.network/v2'),
  NEXT_PUBLIC_ENVIRONMENT: z.enum(['development', 'staging', 'production']).optional().default('production'),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof server>]: z.infer<typeof server>[k] | undefined }}
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  // Add your server env vars here
  // AVAX_API_KEY: process.env.AVAX_API_KEY,
  // DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_METRICS_API_URL: process.env.NEXT_PUBLIC_METRICS_API_URL,
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
} as const;

// Don't touch the part below
// --------------------------

const merged = server.merge(client);
/** @type z.infer<merged> */
let env = process.env;

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === 'undefined';

  const parsed = isServer
    ? merged.safeParse(processEnv) // on server we can validate all env vars
    : client.safeParse(processEnv); // on client we can only validate client env vars

  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    );
    throw new Error('Invalid environment variables');
  }

  /** @type z.infer<merged> */
  env = new Proxy(parsed.data as any, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would be a confusing error like:
      // ❌ Attempted to access `API_SECRET` on the client-side but `API_SECRET` is only available on the server-side
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_') && prop in target)
        throw new Error(
          `❌ Attempted to access \`${prop}\` on the client-side but \`${prop}\` is only available on the server-side`,
        );
      return target[prop as keyof typeof target];
    },
  });
}

export { env }; 