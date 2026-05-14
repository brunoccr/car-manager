"use client";

import { confirmChangePassword } from "@/actions/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loading } from "@/components/ui/Loading";

function PasswordChangeMain() {
  const token = useSearchParams().get("token");

  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    const result = await confirmChangePassword(formData);

    if (result.success) {
      setMessage("Senha alterada! Redirecionando para o login...");
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } else {
      setMessage(result?.error ?? "");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/icon-192x192.png"
          alt="Car Manager"
          width={100}
          height={100}
          loading="eager"
          className="mx-auto h-28 w-auto"
        ></Image>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Car Manager
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={handleSubmit} className="space-y-6">
          <Loading label="Processando" />
          <input type="hidden" id="token" name="token" value={token ?? ""} />
          <div>
            <label
              htmlFor="pass1"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Senha
            </label>
            <div className="mt-2">
              <input
                tabIndex={1}
                id="pass1"
                type="password"
                name="pass1"
                minLength={8}
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="pass2"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Confirmação da Senha
            </label>
            <div className="mt-2">
              <input
                tabIndex={1}
                id="pass2"
                type="password"
                name="pass2"
                minLength={8}
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {message && (
            <div className="mt-5 flex items-center flex-col">{message}</div>
          )}

          <div>
            <button
              tabIndex={3}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Alterar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PasswordChange() {
  return (
    <Suspense>
      <PasswordChangeMain />
    </Suspense>
  );
}
