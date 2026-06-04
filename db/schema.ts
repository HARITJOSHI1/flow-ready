import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const workflowStatus = pgEnum("workflow_status", ["DRAFT", "PUBLISHED"]);
export const workflowtrigger = pgEnum("workflow_trigger", ["MANUAL", "CRON"]);
export const workflowExecutionStatus = pgEnum("workflow_execution_status", [
  "PENDING",
  "RUNNING",
  "COMPLETED",
]);
export const executionPhaseStatus = pgEnum("execution_phase_status", [
  "CREATED",
  "PENDING",
  "RUNNING",
  "FAILED",
  "COMPLETED",
]);

// Tables
export const workflow = pgTable("workflow", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 255 }),
  userId: text("user_id").notNull(),
  defination: text("defination"),
  executionPlan: text("execution_plan"),
  creditsCost: integer("credits_cost").default(0).notNull(),
  cron: text("cron"),
  nextRunAt: timestamp("next_run_at"),
  status: workflowStatus("status").notNull(),
  lastRunAt: timestamp("last_run_at"),
  lastRunId: text("last_run_id"),
  lastRunStatus: workflowExecutionStatus("last_run_status"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workflowExecution = pgTable("workflow_execution", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  workflowId: uuid("workflowId")
    .references(() => workflow.id, { onDelete: "cascade" })
    .notNull(),

  defination: text("defination").default("{}"),
  creditsConsumed: integer().default(0).notNull(),
  userId: text("user_id").notNull(),
  status: workflowExecutionStatus("status").notNull(),
  trigger: workflowtrigger("trigger").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
});

export const executionPhase = pgTable("execution_phase", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),

  userId: text("user_id").notNull(),
  status: executionPhaseStatus("status").notNull(),
  phaseNumber: integer("phase_number").notNull(),
  node: text("node"),
  name: varchar("name", { length: 256 }),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  inputs: text("inputs"),
  outputs: text("outputs"),
  creditsConsumed: integer(),
  workflowExecutionId: uuid("workflow_execution_id")
    .references(() => workflowExecution.id, { onDelete: "cascade" })
    .notNull(),
});

export const executionLogs = pgTable("execution_logs", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),

  logLevel: text("log_level").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  workflowExecutionPhaseId: uuid("workflow_execution_phase_id")
    .references(() => executionPhase.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const userBalance = pgTable("user_balance", {
  id: uuid("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  credits: integer().default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const workflowExecution__with__executionPhase = relations(
  workflowExecution,
  ({ many }) => ({
    executionPhase: many(executionPhase),
  }),
);

export const executionPhase__with__workflowExecution = relations(
  executionPhase,
  ({ one }) => ({
    workflowExecution: one(workflowExecution, {
      fields: [executionPhase.workflowExecutionId],
      references: [workflowExecution.id],
    }),
  }),
);

export const workflow__with__workflowExecution = relations(
  workflow,
  ({ many }) => ({
    workflowExecution: many(workflowExecution),
  }),
);

export const workflowExecution__with__workflow = relations(
  workflowExecution,
  ({ one }) => ({
    workflow: one(workflow, {
      fields: [workflowExecution.workflowId],
      references: [workflow.id],
    }),
  }),
);

export const executionPhase__with__executionLogs = relations(
  executionPhase,
  ({ many }) => ({
    executionLogs: many(executionLogs),
  }),
);

export const executionLogs__with__executionPhase = relations(
  executionLogs,
  ({ one }) => ({
    executionPhase: one(executionPhase, {
      fields: [executionLogs.workflowExecutionPhaseId],
      references: [executionPhase.id],
    }),
  }),
);

// Types
export type Workflow = typeof workflow.$inferSelect;
export type ExecutionPhase = typeof executionPhase.$inferSelect;
export type WorkflowExecution = typeof workflowExecution.$inferSelect;
export type ExecutionLog = typeof executionLogs.$inferSelect;
