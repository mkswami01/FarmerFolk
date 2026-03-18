import { LoginForm } from "@/components/LoginForm";

export const metadata = {
  title: "Log In — MarketFolk",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-brand-dark">
          Welcome back
        </h1>
        <p className="mt-2 text-brand-muted">
          Log in to your MarketFolk account.
        </p>
      </div>
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <LoginForm />
      </div>
    </div>
  );
}
