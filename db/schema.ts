import { pgTable, uuid, varchar, timestamp, text, pgEnum } from "drizzle-orm/pg-core";

export const workflowStatus = pgEnum("workflow_status", ["DRAFT", "PUBLISHED"]);

// Tables
export const workflow = pgTable("workflow", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 255 }),
  userId: text("user_id").notNull(),
  defination: text("defination").notNull(),
  status: workflowStatus("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// types
export type TWorkflow = typeof workflow.$inferSelect;

