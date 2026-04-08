"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((v) => v === true, {
    message: "Please agree to the Terms of Service and Privacy Policy",
  }),
});

type RegisterValues = z.infer<typeof registerSchema>;

function passwordStrength(password: string): "weak" | "medium" | "strong" | null {
  if (!password) return null;
  if (password.length < 8) return "weak";

  let score = 0;
  if (password.length >= 10) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  else if (/[a-zA-Z]/.test(password)) score += 0.5;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score >= 3) return "strong";
  if (score >= 1.5) return "medium";
  return "weak";
}

function PasswordStrengthMeter({ password }: { password: string }) {
  const strength = passwordStrength(password);

  const config = {
    weak: {
      label: "Weak",
      bars: 1,
      text: "text-brand-coral",
      bar: "bg-brand-coral",
    },
    medium: {
      label: "Medium",
      bars: 2,
      text: "text-brand-rose",
      bar: "bg-brand-rose",
    },
    strong: {
      label: "Strong",
      bars: 3,
      text: "text-brand-purple",
      bar: "bg-brand-purple",
    },
  };

  if (!strength) return null;
  const c = config[strength];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < c.bars ? c.bar : "bg-brand-dark/10"
            )}
          />
        ))}
      </div>
      <p className={cn("font-body text-xs font-medium", c.text)}>
        Password strength: {c.label}
      </p>
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const passwordValue = watch("password") ?? "";

  const onSubmit = async (data: RegisterValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
        }),
      });

      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        details?: Record<string, string[] | undefined>;
      };

      if (!res.ok) {
        if (res.status === 409) {
          setServerError("An account with this email already exists.");
          return;
        }
        if (res.status === 422 && body.details) {
          setServerError("Please check the highlighted fields.");
          return;
        }
        setServerError(
          body.error ?? "Something went wrong. Please try again."
        );
        return;
      }

      router.push("/login?registered=1");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
    }
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold text-brand-dark sm:text-3xl">
          Start your story 🌟
        </h1>
        <p className="mt-2 font-body text-brand-dark/75">
          Create your free GinnieTales account
        </p>
      </div>

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
        {serverError ? (
          <div
            role="alert"
            className="rounded-xl border border-brand-coral/40 bg-brand-coral/10 px-4 py-3 font-body text-sm text-brand-dark"
          >
            {serverError}
          </div>
        ) : null}

        <Input
          id="register-name"
          label="Name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          id="register-email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
          <Input
            id="register-password"
            label="Password"
            type="password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordStrengthMeter password={passwordValue} />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-1 font-body text-sm text-brand-dark/90 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-purple has-[:focus-visible]:ring-offset-2">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-dark/25 text-brand-purple focus:ring-brand-purple"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              )}
            />
            <span>
              I agree to the{" "}
              <a
                href="#"
                className="font-semibold text-brand-purple underline-offset-2 hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-semibold text-brand-purple underline-offset-2 hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.terms?.message ? (
            <p
              role="alert"
              className="mt-2 font-body text-sm text-brand-coral"
            >
              {errors.terms.message}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
        >
          Create Account
        </Button>
      </form>

      <p className="text-center font-body text-sm text-brand-dark/80">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-purple underline-offset-2 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
