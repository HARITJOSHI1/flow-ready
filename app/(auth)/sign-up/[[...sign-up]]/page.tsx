"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import React from "react";

const SignUpPage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <SignUp
      appearance={{
        baseTheme:
          resolvedTheme === "dark" ||
          resolvedTheme === undefined
            ? dark
            : undefined,
      }}
    />
  );
};

export default SignUpPage;
