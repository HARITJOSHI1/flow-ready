import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <ClerkProvider
      afterSignOutUrl="/sign-in"
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90 text-sm !shadow-none p-2 hover:transition-all duration-300",

          formFieldInput:
            "border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-4",

          socialButtonsBlockButton__google:
            "border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-4 bg-background !shadow-none hover:bg-background/50 hover:translate-y-[-4px] transition-all duration-300",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
