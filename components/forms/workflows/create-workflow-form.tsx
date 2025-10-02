"use client";

import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TCreateWorkflowSchema, createWorkflowSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateWorkflowMutation } from "@/hooks/workflows/use-create-workflow";
import { Loader2 } from "lucide-react";

const CreateWorkflowForm = () => {
  
  const { mutate, isPending, isSuccess } = useCreateWorkflowMutation();

  const form = useForm<TCreateWorkflowSchema>({
    resolver: zodResolver(createWorkflowSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = useCallback(
    (values: TCreateWorkflowSchema) => {
      mutate(values);
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          disabled={isPending}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center">
                Name
                <p className="text-sm text-primary">(required)</p>
              </FormLabel>

              <FormControl>
                <Input placeholder="Your workflow name" {...field} />
              </FormControl>

              <FormDescription>
                Choose a descriptive and unique name for your workflow
              </FormDescription>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center">
                Description
                <p className="text-sm text-muted-foreground">(optional)</p>
              </FormLabel>

              <FormControl>
                <Textarea
                  className="resize-none"
                  {...field}
                  placeholder="Your workflow description"
                />
              </FormControl>

              <FormDescription>
                Provide a brief description of your workflow. It is optional but
                it will help you remember what your workflow is for.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
          className="w-full bg-primary text-primary-foreground"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Proceed"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateWorkflowForm;
