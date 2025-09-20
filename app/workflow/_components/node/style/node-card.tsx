"use client";

import { useFlowValidation } from "@/hooks/validation/useFlowValidation";
import { isErr } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React, { memo } from "react";

type Props = {
  children: React.ReactNode;
  nodeId: string;
  isSelected?: boolean;
};

const MNodeCard = ({ children, nodeId, isSelected }: Props) => {
  const { getNode, setCenter } = useReactFlow();
  const result = useFlowValidation();

  if (isErr(result)) return null;

  const hasInvalidErrors = result.data.invalidInputs.some(
    (inv) => inv.nodeId === nodeId
  );

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;

        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;

        if (!width || !height || !position.x || !position.y) return;
        const newPosition = {
          x: position.x + width / 2,
          y: position.y + height / 2,
        };

        setCenter(newPosition.x, newPosition.y, { duration: 500, zoom: 1 });
      }}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-seperate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary",
        hasInvalidErrors && "border-destructive border-2"
      )}
    >
      {children}
    </div>
  );
};

const NodeCard = memo(MNodeCard);
NodeCard.displayName = "NodeCard";

export default NodeCard;
