"use client";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useRouter } from "next/navigation";
import React from "react";

type BtnColors = {
  primary: string;
  secondary: string;
  shadow: string;
};

type Props = {
  text: string;
  color?: BtnColors;
};

const Cta = ({ text, color }: Props) => {
  const router = useRouter();
  return (
    <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 hover:translate-y-[-2px] transition-all shadow-md shadow-purple-200"
      onClick={() => router.push("/dashboard")}
    >
      <span>{text}</span>
    </HoverBorderGradient>
  );
};

export default Cta;
