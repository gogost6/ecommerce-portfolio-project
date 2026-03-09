import { SignUpForm } from "@/components/sign-up-form";

export const metadata = {
  title: "Sign Up",
  description: "Create a new account to start shopping with us",
};

export default function Page() {
  return (
    <div className="min-h-svh-minus-nav flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
