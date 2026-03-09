import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Login",
  description: "Access your account by logging in with your credentials",
};

export default function Page() {
  return (
    <div className="min-h-svh-minus-nav flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
