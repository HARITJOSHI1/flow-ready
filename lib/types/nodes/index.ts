import { Node } from "@xyflow/react";
import { TaskInputs, TaskType } from "../tasks";

export type ParamProps = {
  param: TaskInputs;
  value: string;
  updateNodeParamProps: (newValue: string) => void;
};

export interface DataNode {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: DataNode;
}

/**
 * Extracts a union of string literal values from a TypeScript string enum.
 * 
 * @example
 * ```typescript
 * enum MyStringEnum {
 *   Foo = "foo_value",
 *   Bar = "bar_value",
 * }
 * 
 * type MyEnumLiteralUnion = EnumValues<typeof MyStringEnum>;
 * // MyEnumLiteralUnion will be "foo_value" | "bar_value"
 * ```
 * 
 * If the resulting type is `string` instead of a union of literals, ensure:
 * 1. The enum's values are strict string literals (not computed or variable-based).
 * 2. You are passing `typeof YourEnum` as the generic type argument.
 */
export type EnumValues<T> = T extends Record<string, infer U> ? U : never;