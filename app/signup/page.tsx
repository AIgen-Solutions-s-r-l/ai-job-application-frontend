"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Importa el router
import config from "@/config";
import Image from "next/image";
import { fetchUserData, register } from "@/libs/api/auth"; // Importa la función register
import RequireLogout from "@/permissions/requireLogout";
import { useUserContext } from "@/contexts/user-context";
import { isResumeExits } from "@/libs/api/resume";

const Signup = () => {
  const [username, setUsername] = useState(""); // Nuevo campo para username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
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
      const result = await register(username, email, password);

      if (result.success) {
        localStorage.setItem('username', username);
        toast.success('Logged in successfully!');
        try {
          const [exists, me] = await Promise.all([
            isResumeExits(),
            fetchUserData(),
          ]);

          setUser({ ...exists, ...me });
          router.replace(exists.exists ? "/dashboard" : "/onboarding");
        } catch (error) {
          router.replace("/onboarding");
        }
      } else if (result.success == false) {
        toast.error(result.error || "Failed to create account.");
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
      <div className="w-full md:max-w-lg px-4 md:p-10 space-y-6 card bg-base-100 border-none md:border-2">
        <div className="flex flex-col gap-2">
          <Image src="/laboro.png" alt="Logo" width={214} height={58} />
          <h2 className="text-xl md:text-2xl font-semibold">Create an account</h2>
        </div>

        <form className="space-y-4 font-jura" onSubmit={handleSignup}>
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
            className={`btn btn-primary w-full text-white font-medium text-base ${isLoading && "btn-disabled"}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="flex text-xs md:text-sm mt-4">
          <p className="text-center">
            If you are already a member, please <Link href="/signin" className="text-primary">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default RequireLogout(Signup);