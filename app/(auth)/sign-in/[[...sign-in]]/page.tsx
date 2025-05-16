"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const SignInPage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <SignIn
      appearance={{
        baseTheme:
          resolvedTheme === "dark" ||
          resolvedTheme === "system" ||
          resolvedTheme === undefined
            ? dark
            : undefined,
      }}
    />
  );
};

export default SignInPage;
