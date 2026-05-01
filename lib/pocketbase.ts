import { cookies } from "next/headers";
import PocketBase from "pocketbase";

export async function createServerClient() {
  const pb = new PocketBase(process.env.POCKET_BASE_URL);

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pb_auth");

  if (authCookie) {
    pb.authStore.loadFromCookie(authCookie.value, authCookie.name);
    pb.collection('users').authRefresh();
  }

  pb.authStore.onChange(() => {
    if (pb.authStore.isValid) {
      cookieStore.set(
        "pb_auth",
        pb.authStore.exportToCookie({ 
           httpOnly: true, 
           secure: true, 
           sameSite: "lax", 
           path: "/" 
        }),
      );
    }
  });

  return pb;
}
