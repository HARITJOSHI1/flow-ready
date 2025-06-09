"use client";

import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  nodeId: string;
  isSelected?: boolean;
};

const NodeCard = ({ children, nodeId, isSelected }: Props) => {
  const { getNode, setCenter } = useReactFlow();

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;

        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;

        if (!width || !height || position.x || position.y) return;
        const newPosition = {
          x: position.x + width / 2,
          y: position.y + height / 2,
        };

        setCenter(newPosition.x, newPosition.y, { duration: 500, zoom: 1 });
      }}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-seperate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
