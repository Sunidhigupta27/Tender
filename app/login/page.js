import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Log in — Tender Agent",
  description: "Log in to your Tender Agent dashboard.",
};

export default function LoginPage() {
  return (
    <main className="login-page">
      <LoginForm />
    </main>
  );
}
