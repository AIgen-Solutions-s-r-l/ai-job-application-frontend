"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import config from "@/config";
import { useRouter } from "next/navigation";
import { fetchUserData, login } from "@/libs/api/auth"; // Importa la función de login
import { isResumeExits } from "@/libs/api/resume";
import RequireLogout from "@/permissions/requireLogout";
import { useUserContext } from "@/contexts/user-context";

const Login = () => {
  const [email, setEmail] = useState<string>(""); // Cambiado de email a username
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success && result.value?.access_token) {
        toast.success("Logged in successfully!");
        try {
          const [exists, me] = await Promise.all([
            isResumeExits(),
            fetchUserData()
          ]);

          setUser({ ...exists, ...me });
          router.replace(exists.exists ? "/dashboard" : "/onboarding");
        } catch (error) {
          router.replace("/onboarding");
        }
      } else if (result.success == false) {
        toast.error(result.error || "Failed to login.");
      } else {
        throw new Error("Access token not received.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-base-100 md:bg-base-200 font-montserrat" data-theme={config.colors.theme}>
      <div className="absolute top-4 left-4">
        <Link href="/" className="btn btn-ghost btn-sm flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>
      <div className="w-full md:max-w-lg px-4 md:p-10 space-y-6 card bg-base-100 border-none md:border-2">
        <div className="flex flex-col gap-2">
          <Image src="/laboro.png" alt="Logo" width={214} height={58} />
          <h2 className="text-xl md:text-2xl font-semibold">Login to your Account</h2>
        </div>

        <form className="space-y-4 font-jura" onSubmit={handleLogin}>
          <div className="form-control">
            <input
              type="text" // Cambiado de "email" a "text"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Cambiado a setEmail
              required
              className="input input-bordered w-full"
              placeholder="Email address" // Cambiado de "Email address" a "Email"
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full autofill:!bg-yellow-200"
              placeholder="Password"
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
              "Sign in"
            )}
          </button>
        </form>

        <div className="flex justify-between text-xs md:text-sm mt-4">
          <Link href="/forgot-password" className="font-medium text-primary">
            Forgot password?
          </Link>
          <p className="text-center">
            Don’t have an account? <Link href="/signup" className="text-primary">Sign Up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default RequireLogout(Login);