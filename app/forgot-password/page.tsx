"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import config from "@/config";
import Image from "next/image";
import { resetPasswordForEmail } from "@/libs/api/auth";

export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailSend, setIsEmailSend] = useState<boolean>(false);

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await resetPasswordForEmail(email);
      if (response.success) {
        toast.success("Password reset email sent! Check your inbox.");
        setIsEmailSend(true);
      } else {
        toast.error(`Failed to send password reset email: ${response.error}`);
        console.error("Failed to send password reset email.:", response.error);
      }
    } catch (error) {
      console.error("Unexpected error occured during password reset:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-base-100 md:bg-base-200 font-montserrat" data-theme={config.colors.theme}>
      <div className="w-full md:max-w-lg px-4 md:p-10 space-y-6 card bg-base-100 border-none md:border-2">
        <div className="flex flex-col">
          <Image src="/laboro.png" alt="Logo" width={214} height={58} />
          <h2 className="text-xl md:text-2xl font-semibold mt-2 mb-4">Reset your password</h2>
          
          {isEmailSend ? (
            <p className="text-sm text-gray-600 mb-4">
              Password reset email was sent yo your inbox! Follow the instructions to reset your password.
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          )}
        </div>

        {isEmailSend || (
          <form className="space-y-4 font-jura" onSubmit={handleResetPassword}>
            <div className="form-control">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="^[a-zA-Z0-9.]{4,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]+$"
                className="input input-bordered w-full"
                placeholder="Email address"
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
                "Send reset link"
              )}
            </button>
          </form>
        )}

        <div className="flex text-xs md:text-sm mt-4">
          <p className="">
            Remember your password? <Link href="/signin" className="text-primary">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}