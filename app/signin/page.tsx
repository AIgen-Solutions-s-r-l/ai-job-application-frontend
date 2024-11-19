"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";
import { useState } from "react";
import toast from "react-hot-toast";
import config from "@/config";
import { useRouter } from "next/navigation";
import { login } from "@/libs/api/auth"; // Importa la función de login

export default function Login() {
  const [username, setUsername] = useState<string>(""); // Cambiado de email a username
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(username, password);

      if (response?.access_token) {
        localStorage.setItem("accessToken", response.access_token);
        toast.success("Logged in successfully!");
        router.replace("/dashboard");
      } else {
        throw new Error("Access token not received.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-base-200" data-theme={config.colors.theme}>
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
      <div className="w-full max-w-lg p-10 space-y-6 card bg-base-100 border-2">
        <div className="text-center">
          <Image
            src={logo}
            alt="Logo"
            width={64}
            height={64}
            className="mx-auto mb-8"
          />
          <h2 className="text-3xl font-bold">Login to your Account</h2>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="form-control">
            <input
              type="text" // Cambiado de "email" a "text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Cambiado a setUsername
              required
              className="input input-bordered w-full"
              placeholder="Username" // Cambiado de "Email address" a "Username"
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full"
              placeholder="Password"
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
              "Sign in"
            )}
          </button>
        </form>

        <div className="flex justify-center text-sm mt-4">
          {/* <Link href="/forgot-password" className="text-sm font-medium text-primary">
            Forgot password?
          </Link> */}
          <p className="text-center text-sm">
            Don’t have an account? <Link href="/signup" className="text-sm text-primary">Sign Up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}