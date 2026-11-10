"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  return <Toaster position="bottom-right" richColors closeButton theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        {children}
        <ThemedToaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
