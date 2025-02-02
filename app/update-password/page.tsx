"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/libs/supabase/client";
import toast from "react-hot-toast";
import config from "@/config";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/libs/api/auth";
import Link from "next/link";

export default function UpdatePassword({
  searchParams,
}: {
  searchParams: { token: string; };
}) {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const router = useRouter();
  const token = searchParams.token;

  useEffect(() => {
    if (!token) {
      router.replace("/forgot-password");
    }
  });
  
  const handleUpdatePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await resetPassword(newPassword, searchParams.token);
      if (response.success) {
        toast.success("Password updated successfully! Please log in with your new password.");
        router.replace("/signin");
      } else {
        toast.error(`Failed to update password: ${response.error}`);
        console.error("Failed to update password.:", response.error);
        setHasError(true);
      }
    } catch (error) {
      console.error("Unexpected error occured during password update:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-base-200" data-theme={config.colors.theme}>
      <div className="w-full max-w-lg p-10 space-y-6 card bg-base-100 border-2">
        <div className="text-center">
          <img src="/icon.png" alt="Logo" className="mx-auto mb-4 w-16" />
          <h2 className="text-2xl font-bold mb-6">Set a new password</h2>
          <p className="text-sm text-gray-600 mb-4">Enter your new password below to update your account.</p>
        </div>

        <form className="space-y-4" onSubmit={handleUpdatePassword}>
          <div className="form-control">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="input input-bordered w-full"
              placeholder="New password"
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input input-bordered w-full"
              placeholder="Confirm new password"
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
              "Update password"
            )}
          </button>
          {hasError && (
            <Link href="/forgot-password" className="btn btn-secondary w-full">Send new email</Link>
          )}
        </form>

        <div className="flex justify-center text-sm mt-4">
          <p className="text-center text-sm">
            Remembered your password? <a href="/signin" className="text-primary">Sign in</a>
          </p>
        </div>
      </div>
    </main>
  );
}