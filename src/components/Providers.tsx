"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  return <Toaster position="bottom-right" richColors closeButton theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const googleId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const inner = (
    <AuthProvider>
      {children}
      <ThemedToaster />
    </AuthProvider>
  );
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {googleId ? <GoogleOAuthProvider clientId={googleId}>{inner}</GoogleOAuthProvider> : inner}
    </ThemeProvider>
  );
}
