import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";

// Tables
export const workflow = pgTable("workflow", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 255 }),
  userId: text("user_id").notNull(),
  defination: text("defination").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// types
export type TWorkflow = typeof workflow.$inferSelect;

