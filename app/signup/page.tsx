"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Importa el router
import config from "@/config";
import Image from "next/image";
import logo from "@/app/icon.png";
import { register } from "@/libs/api/auth"; // Importa la función register

export default function Signup() {
  const [username, setUsername] = useState(""); // Nuevo campo para username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Usa el router

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // Llama a la API para registrar al usuario
      const response = await register(username, email, password);
      
      if (!response?.access_token) {
        throw new Error('Access token not received.');
      }

      localStorage.setItem('username', username);
      toast.success('Logged in successfully!');
      router.replace('/dashboard');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to create account.");
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
          <h2 className="text-3xl font-bold">Create an account</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="form-control">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input input-bordered w-full"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full"
              placeholder="Create a password"
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input input-bordered w-full"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary w-full ${isLoading && "btn-disabled"}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="flex justify-center text-sm mt-4">
          <p className="text-center text-sm">
            If you are already a member, please <Link href="/signin" className="text-primary">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}