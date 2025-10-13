import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React, { ReactNode } from "react";

type Props = {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
};

const ExecutionLabel = ({ label, icon, value }: Props) => {
  const Icon = icon;
  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm">
      <div className="text-muted-foreground flex itens-center gap-2">
        <Icon
          size={20}
          className={cn(
            "stroke-muted-foreground/80",
            value?.toString() === "PENDING" && "animate-spin"
          )}
        />
        <span>{label}</span>
      </div>

      <div className="font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
};

export default ExecutionLabel;
