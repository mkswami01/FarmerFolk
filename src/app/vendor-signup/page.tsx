import { VendorSignupForm } from "@/components/VendorSignupForm";

export const metadata = {
  title: "Vendor Sign Up — MarketFolk",
};

export default function VendorSignupPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-brand-dark">
          List Your Business on Market<span className="text-brand-amber">Folk</span>
        </h1>
        <p className="mt-2 text-brand-muted">
          Create your vendor profile in seconds. Find verified helpers for your booth.
        </p>
      </div>
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <VendorSignupForm />
      </div>
    </div>
  );
}
