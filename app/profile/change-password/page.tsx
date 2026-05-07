"use client";

import { changePassword } from "@/actions/auth";
import AppDrawer from "@/app/components/AppDrawer";
import { ArrowRightLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Garage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    const result = await changePassword(formData);

    if (result.success) {
      setMessage("Senha alterada! Redirecionando para o início...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 5000);
    } else {
      setMessage(result?.error ?? "");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }

  return (
    <div>
      <AppDrawer title="Alterar Senha" showFilter={false} />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="oldpass"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Senha Antiga
              </label>
              <div className="mt-2">
                <input
                  tabIndex={1}
                  id="oldpass"
                  type="password"
                  name="oldpass"
                  minLength={8}
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
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

            <div className="flex flex-col gap-5 fixed bottom-6 right-6 rounded-2xl shadow-lg z-40">
              <button
                tabIndex={99}
                type="submit"
                name="intent"
                value="save"
                className="flex justify-center rounded-2xl shadow-lg p-4 bg-green-500"
              >
                <ArrowRightLeftIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
