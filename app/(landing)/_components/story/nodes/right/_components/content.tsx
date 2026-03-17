import React from "react";

type Props = {
  subtitle: string;
  mainText: string;
  type: string;
  link?: string;
};

const Content = ({ subtitle, mainText, type }: Props) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 py-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-tertiary/10 text-tertiary rounded-full text-xs md:text-sm font-medium inline-flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            {mainText}
          </span>
        </div>
      </div>

      <div className="bg-secondary/30 border border-border rounded-lg p-4 space-y-2.5">
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm text-muted-foreground">
            {type}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-xs md:text-sm text-muted-foreground">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Content;
