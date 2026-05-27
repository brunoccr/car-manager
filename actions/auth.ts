"use server";

import { createServerClient } from "@/lib/pocketbase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserVehicles } from "./vehicles";

export async function changePassword(formData: FormData) {
  const pb = await createServerClient();

  const oldpass = formData.get("oldpass") as string;
  const pass1 = formData.get("pass1") as string;
  const pass2 = formData.get("pass2") as string;

  if (pass1 !== pass2) {
    return { success: false, error: "As senhas estão diferentes!" };
  }

  try {
    await pb.collection("users").update(pb.authStore.record?.id || "", {
      oldPassword: oldpass,
      password: pass1,
      passwordConfirm: pass2,
    });
    await pb
      .collection("users")
      .authWithPassword(pb.authStore.record?.email, pass1);
  } catch (err) {
    console.error(err);
    return { success: false, error: "Erro ao processar alteração de senha!" };
  }

  return { success: true };
}

export async function confirmChangePassword(formData: FormData) {
  const pb = await createServerClient();

  const token = formData.get("token") as string;
  const pass1 = formData.get("pass1") as string;
  const pass2 = formData.get("pass2") as string;

  if (!token) {
    return { success: false, error: "Token inválido!" };
  }

  if (pass1 !== pass2) {
    return { success: false, error: "As senhas estão diferentes!" };
  }

  try {
    await pb.collection("users").confirmPasswordReset(token, pass1, pass2);
  } catch (err) {
    console.error(err);
    return { success: false, error: "Erro ao processar alteração de senha!" };
  }

  return { success: true };
}

export interface GetUserInfoResult {
  name: string;
  vehicles: { id: string; name: string }[];
}

export async function getUserInfo(): Promise<GetUserInfoResult> {
  const pb = await createServerClient();

  const vehicles = (await getUserVehicles())
    .map((v) => {
      return { id: v.value, name: v.label };
    })
    .sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

  return { name: pb.authStore.record?.name, vehicles };
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
