"use client";

import { login } from "@/app/actions/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  //const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    //setLoading(true);
    setError(null);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setTimeout(() => {
        setError(null);
      }, 5000);

      //setLoading(false);
    } else {
      router.refresh();
    }
  }

  async function registerSW() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
    }
  }

  registerSW();

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
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                tabIndex={1}
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Senha
              </label>
              <div className="text-sm">
                <a
                  href="/login/remember"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Esqueceu a senha?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                tabIndex={2}
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
            {error && (
              <div className="mt-5 flex items-center flex-col text-red-700">
                {error}
              </div>
            )}
          </div>

          <div>
            <button
              tabIndex={3}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Não tem cadastro?
          <a
            href="#"
            className="ml-1 font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Clique aqui
          </a>
        </p>
      </div>
    </div>
  );
}
