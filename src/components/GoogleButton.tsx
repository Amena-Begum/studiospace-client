"use client";

import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/lib/types";

const GoogleGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
    <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

export default function GoogleButton({ onSuccess }: { onSuccess: (user: User) => void }) {
  const { googleLogin } = useAuth();
  const configured = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  if (!configured) {
    return (
      <button type="button" className="btn btn-ghost w-full !py-3" onClick={() => toast.info("Google sign-in isn't switched on for this site yet. Please use email and password.")}>
        <GoogleGlyph /> Continue with Google
      </button>
    );
  }
  return (
    <div className="flex justify-center">
      <GoogleLogin
        text="continue_with"
        shape="pill"
        width="320"
        onSuccess={async (res) => {
          try {
            if (!res.credential) throw new Error("Missing credential");
            const user = await googleLogin(res.credential);
            toast.success(`Welcome, ${user.name}!`);
            onSuccess(user);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Google sign-in failed.");
          }
        }}
        onError={() => toast.error("Google sign-in was cancelled or failed.")}
      />
    </div>
  );
}
