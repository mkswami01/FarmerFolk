import { SignupForm } from "@/components/SignupForm";

export const metadata = {
  title: "Sign Up — MarketFolk",
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-brand-dark">
          Join Market<span className="text-brand-amber">Folk</span>
        </h1>
        <p className="mt-2 text-brand-muted">
          Create your helper account and start connecting with vendors.
        </p>
      </div>
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <SignupForm />
      </div>
    </div>
  );
}
