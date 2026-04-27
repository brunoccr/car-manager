"use server";

import { createServerClient } from "@/lib/pocketbase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserInfo() {
  const pb = await createServerClient();

  return pb.authStore.record;
}

export async function recoverPassword(formData: FormData) {
  const pb = await createServerClient();

  const email = formData.get("email") as string;

  try {
    await pb.collection("users").requestPasswordReset(email);
  } catch {
    return { error: "Erro ao tentar solicitar recuperação de senha!" };
  }
}

export async function login(formData: FormData) {
  const pb = await createServerClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await pb.collection("users").authWithPassword(email, password);
  } catch {
    return { error: "Usuário ou Senha inválidos!" };
  }

  redirect("/dashboard");
}

export async function logout() {
  const pb = await createServerClient();

  try {
    const cookieStore = await cookies();
    cookieStore.delete("pb_auth");
    pb.authStore.clear();
  } catch {
    return { error: "Credenciais inválidas" };
  }

  redirect("/login");
}
