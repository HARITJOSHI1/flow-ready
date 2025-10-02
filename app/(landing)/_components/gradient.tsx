import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const Gradient = (props: Props) => {
  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background"
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]  dark:bg-background"
        )}
        aria-hidden="true"
      />
    </>
  );
};

export default Gradient;
