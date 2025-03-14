"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Importa el router
import config from "@/config";
import Image from "next/image";
import { fetchUserData, register, getGoogleOAuthURL } from "@/libs/api/auth"; // Importar getGoogleOAuthURL
import RequireLogout from "@/permissions/requireLogout";
import { useUserContext } from "@/contexts/user-context";
import { isResumeExits } from "@/libs/api/resume";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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
      const result = await register(email, password);

      if (result.success) {
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

  const handleGoogleOath = async () => {
    setIsGoogleLoading(true);
    try {
      const redirectURL = window.location.origin + "/api/auth/callback";
      const result = await getGoogleOAuthURL(redirectURL);
      if (result.success && result.value) {
        window.location.href = result.value;
      } else {
        toast.error("Failed to initiate Google authentication");
      }
    } catch (error) {
      console.error("Error starting Google authentication:", error);
      toast.error("Error starting Google authentication");
    } finally {
      setIsGoogleLoading(false);
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

        <div className="divider text-sm text-gray-500">OR</div>

        <button 
          onClick={handleGoogleOath}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </>
          )}
        </button>

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