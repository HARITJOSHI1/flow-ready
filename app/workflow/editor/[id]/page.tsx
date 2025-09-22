"use client";

import { useGetWorkflowQuery } from "@/hooks/workflows/use-get-workflow";
import Editor from "../_components/editor";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { ERROR_TYPES } from "@/lib/types/errors/server.err";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;
  const { workflow, isPending, error } = useGetWorkflowQuery(id);

  console.log("error", error);

  if (error) {
    // @ts-ignore
    if ((error as Error)?.message.includes("devtools"))
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-primary mb-4 animate-bounce">
              400
            </h1>
            <h2 className="text-2xl font-semibold mb-2">
              Tanstack Devtools Error
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Error happend in development.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/"
                className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors group"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
                Go back to home
              </Link>
            </div>
          </div>
        </div>
      );

    else if (error.error.type === ERROR_TYPES.NOT_FOUND) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-primary mb-4 animate-bounce">
              400
            </h1>
            <h2 className="text-2xl font-semibold mb-2">Sorry</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Oops! You don `&apos; t have any workflows.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/workflows"
                className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors group"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  if (isPending)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2Icon size={30} className="animate-spin stroke-primary" />
      </div>
    );

  if (!workflow) return;
  return <Editor workflow={workflow} />;
};

export default Page;
