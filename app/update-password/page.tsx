"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import config from "@/config";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/libs/api/auth";
import Image from "next/image";
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
    <main className="flex items-center justify-center min-h-screen bg-base-100 md:bg-base-200 font-montserrat" data-theme={config.colors.theme}>
      <div className="w-full md:max-w-lg px-4 md:p-10 space-y-6 card bg-base-100 border-none md:border-2">
        <div className="flex flex-col">
          <Image src="/laboro.png" alt="Logo" width={214} height={58} />
          <h2 className="text-xl md:text-2xl font-semibold mt-2 mb-4">Set a new password</h2>
          <p className="text-sm text-gray-600">Enter your new password below to update your account.</p>
        </div>

        <form className="space-y-4 font-jura" onSubmit={handleUpdatePassword}>
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
            className="btn btn-primary w-full text-white font-medium text-base"
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

        <div className="flex text-xs md:text-sm mt-4">
          <p className="">
            Remembered your password? <a href="/signin" className="text-primary">Sign in</a>
          </p>
        </div>
      </div>
    </main>
  );
}