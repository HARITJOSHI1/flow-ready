"use server";

import { createServerActionOutputSchema } from "@/lib/helpers/global";
import { ERROR_SCHEMA_v2 } from "@/schemas/errors";
import { z } from "zod";
import { base } from "../../base";
import db from "@/db";
import { userBalance } from "@/db/schema";
import { eq } from "drizzle-orm";
import ApiError from "@/lib/classes/Error/ApiError";

export const getAvailableCredits = base
    .createServerAction()
    .output(
        createServerActionOutputSchema(
            z.object({
                balance: z.number(),
            }),
            ERROR_SCHEMA_v2
        )
    )
    .handler(async ({ ctx }) => {
        if (ctx.resolved === "error")
            return { resolved: "error", error: ctx.error };

        const { userId } = ctx.result;
        
        const balance = await db.select().from(userBalance).where(eq(userBalance.userId, userId));

        if (balance.length === 0) {
            throw ApiError.notFound(
                "NOT_FOUND",
                404,
                "No balance found.",
                false,
                {
                    environment: process.env.NODE_ENV,
                    functionName: "getAvailableCredits()",
                }
            );
        }

        return {
            resolved: "success",
            result: {
                balance: balance[0].credits,
            },
        };
    });
