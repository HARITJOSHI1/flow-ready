"use client";

import { useUserAvailableCredits } from "@/hooks/credits/queries/use-user-available-credits";
import { cn } from "@/lib/utils";
import { CoinsIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CountupWrapper from "../common/countup-wrapper";
import { buttonVariants } from "../ui/button";

const UserAvailableCreditsBadge = () => {
  const { data: balance, isPending } = useUserAvailableCredits();

  return (
    <Link
      href={"/billing"}
      className={cn(
        "w-full space-x-2 flex items-center",
        buttonVariants({ variant: "outline" }),
      )}
    >
      <CoinsIcon size={20} className="text-primary" />
      <span className="font-semibold capitalize">
        {isPending && <Loader2Icon className="w-4 h-4 animate-spin" />}
        {!isPending && balance && <CountupWrapper value={balance} />}
        {!isPending && balance === undefined && "-"}
      </span>
    </Link>
  );
};

export default UserAvailableCreditsBadge;
