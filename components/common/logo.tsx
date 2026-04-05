import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  fontSize?: string;
  iconSize?: number;
};

const Logo = ({ fontSize = "2xl", iconSize = 20 }: Props) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-xl font-extrabold flex items-center gap-2 md:text-2xl",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-violet-400 to-violet-700 p-2">
        <SquareDashedMousePointer size={iconSize} className="stroke-white" />
      </div>

      <div>
        <span className="bg-gradient-to-r from-violet-400 to-violet-700 bg-clip-text text-transparent">
          Fast
        </span>
        <span className="text-violet-900">Flow</span>
      </div>
    </Link>
  );
};

export default Logo;
