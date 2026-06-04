"use client";

import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

type Props = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const CustomDialogHeader = (props: Props) => {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {props.icon && (
            <props.icon className={cn(props.iconClassName, "stroke-primary")} size={40} />
          )}
          {props.title && (
            <p className={cn(props.titleClassName, "text-2xl text-primary font-bold")}>
              {props.title}
            </p>
          )}

          {props.subtitle && (
            <p className={cn(props.subtitleClassName, "text-sm text-muted-foreground")}>
              {props.subtitle}
            </p>
          )}
        </div>
      </DialogTitle>

      <Separator />
    </DialogHeader>
  );
};

export default CustomDialogHeader;
