"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

function safeCallbackUrl(url: string | null): string {
  if (!url || !url.startsWith("/") || url.startsWith("//")) return "/dashboard";
  return url;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const callbackUrl = safeCallbackUrl(searchParams.get("callbackUrl"));

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginValues) => {
    setAuthError(null);
    const result = await signIn("credentials", {
      email: data.email.trim().toLowerCase(),
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setAuthError("That email or password doesn’t look quite right. Try again?");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  const handleGoogle = () => {
    setAuthError(null);
    signIn("google", {
      callbackUrl,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold text-brand-dark sm:text-3xl">
          Welcome back ✨
        </h1>
        <p className="mt-2 font-body text-brand-dark/75">
          Your magical stories are waiting
        </p>
      </div>

      {registered ? (
        <p
          className="rounded-xl border border-brand-purple/30 bg-brand-purple/5 px-4 py-3 text-center font-body text-sm text-brand-dark"
          role="status"
        >
          Account created! You can sign in below.
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleGoogle}
        className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-brand-dark/10 bg-white py-2.5 font-body font-semibold text-brand-dark shadow-sm transition hover:border-brand-purple/30 hover:bg-brand-cream/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="relative flex items-center py-1">
        <div className="grow border-t border-brand-dark/15" />
        <span className="mx-4 shrink-0 font-body text-sm text-brand-dark/50">
          or
        </span>
        <div className="grow border-t border-brand-dark/15" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {authError ? (
          <div
            role="alert"
            className="rounded-xl border border-brand-coral/40 bg-brand-coral/10 px-4 py-3 font-body text-sm text-brand-dark"
          >
            {authError}
          </div>
        ) : null}

        <Input
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
          <Input
            id="login-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            error={errors.password?.message}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="rounded-lg p-1.5 font-body text-xs font-medium text-brand-purple hover:bg-brand-purple/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
            {...register("password")}
          />
          <div className="mt-2 text-right">
            <a
              href="#"
              className="font-body text-sm font-medium text-brand-rose underline-offset-2 hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Forgot password?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
        >
          Sign In
        </Button>
      </form>

      <p className="text-center font-body text-sm text-brand-dark/80">
        New here?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand-purple underline-offset-2 hover:underline"
        >
          Create your account
        </Link>
      </p>
    </div>
  );
}
