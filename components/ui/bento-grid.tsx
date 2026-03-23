import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-min grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento transition duration-200 p-4 flex flex-col justify-center items-center text-center",
        className
      )}
    >
      <div className="group-hover/bento:-translate-y-1 transition duration-200 w-full h-full flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};
