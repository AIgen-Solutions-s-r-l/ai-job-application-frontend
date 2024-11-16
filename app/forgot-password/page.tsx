"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/libs/supabase/client";
import toast from "react-hot-toast";
import config from "@/config";
import Image from "next/image";
import logo from "@/app/icon.png";

export default function ResetPassword() {
  const supabase = createClient();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/update-password",
      });
      if (error) throw error;
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send password reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-base-200" data-theme={config.colors.theme}>
      <div className="w-full max-w-lg p-10 space-y-6 card bg-base-100 border-2">
        <div className="text-center">
          <Image
            src={logo}
            alt="Logo"
            width={64}
            height={64}
            className="mx-auto mb-8"
          />
          <h2 className="text-3xl font-bold mb-4">Reset your password</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleResetPassword}>
          <div className="form-control">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
              placeholder="Email address"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Send reset link"
            )}
          </button>
        </form>

        <div className="flex justify-center text-sm mt-4">
          <p className="text-center text-sm">
            Remember your password? <Link href="/signin" className="text-primary">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}