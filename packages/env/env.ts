//@ts-ignore
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
    server: {
        GOOGLETRANSLATEAPIKEY: z.string().optional(),
        MUSIXMATCH_API_KEY: z.string(),
        PORT: z.string().optional(),
    },
    runtimeEnv: process.env,
});
