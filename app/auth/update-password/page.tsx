import { UpdatePasswordForm } from "@/components/update-password-form";

export const metadata = {
  title: "Update Password",
  description: "Change your password to keep your account secure",
};

export default function Page() {
  return (
    <div className="min-h-svh-minus-nav flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
