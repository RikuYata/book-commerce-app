import GitHubSignInButton from "@/app/components/GitHubSignInButton";
import { getSession } from "@/app/lib/auth";
import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function Login({ searchParams }: LoginPageProps) {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  const { error } = await searchParams;

  return (
    <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウントにログイン
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {error && (
            <p className="text-center text-sm text-red-600">
              ログインに失敗しました。もう一度お試しください。
            </p>
          )}
          <div className="text-center">
            <GitHubSignInButton />
          </div>
        </div>
      </div>
    </div>
  );
}
