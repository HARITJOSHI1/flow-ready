"use client";

import TooltipWrapper from "@/components/common/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import SaveBtn from "./save-btn";
import ExecuteBtn from "./execute-btn";

type Props = {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideBtn?: boolean;
};

const Topbar = ({ title, subtitle, workflowId, hideBtn }: Props) => {
  const router = useRouter();

  return (
    <header className="flex p-2 border-b-2 border-seperate justify-center items-center w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>

        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-muted-foreground text-xs truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 gap-1 justify-end">
        {!hideBtn && (
          <>
            <ExecuteBtn workflowId={workflowId} />
            <SaveBtn workflowId={workflowId} />
          </>
        )}
      </div>
    </header>
  );
};

export default Topbar;
