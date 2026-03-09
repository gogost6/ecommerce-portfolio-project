import { ForgotPasswordForm } from "@/components/forgot-password-form";

export const metadata = {
  title: "Forgot Password",
  description: "Reset your password by entering your email address",
};

export default function Page() {
  return (
    <div className="min-h-svh-minus-nav flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
