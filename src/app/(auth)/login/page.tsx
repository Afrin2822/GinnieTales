import { Suspense } from "react";
import { LoginForm } from "./login-form";

function LoginFallback() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-16 rounded-xl bg-brand-purple/10" />
      <div className="h-12 rounded-xl bg-brand-dark/10" />
      <div className="h-12 rounded-xl bg-brand-dark/10" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
