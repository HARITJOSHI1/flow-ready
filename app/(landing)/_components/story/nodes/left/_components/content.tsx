import React from "react";

type Props = {
  text: string;
  mainText: string;
  link: string;
  type: string;
};

const Content = ({ text, mainText, link, type }: Props) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
          {mainText} <span className="text-destructive">*</span>
        </label>
        <div className="bg-secondary/50 border border-border rounded-lg p-3 text-sm text-muted-foreground">
          {text}
        </div>
        <div className="text-xs text-muted-foreground mt-1.5">eg: {link}</div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3 text-sm">
          <span className="px-3 py-1.5 bg-tertiary/10 text-tertiary rounded-full text-xs md:text-sm font-medium inline-flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tertiary" />
            {type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Content;
