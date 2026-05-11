import { cookies } from "next/headers";
import PocketBase from "pocketbase";

export async function createServerClient() {
  const pb = new PocketBase(process.env.POCKET_BASE_URL);

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pb_auth");

  if (authCookie) {
    pb.authStore.loadFromCookie(`pb_auth=${authCookie.value}`);
  }

  pb.authStore.onChange(() => {
    if (pb.authStore.isValid) {
      const maxAge = 60 * 60 * 24 * 7;

      const cookieString = pb.authStore.exportToCookie({
        maxAge,
        path: "/",
      });

      const rawValue = cookieString.split(";")[0].split("=")[1];

      cookieStore.set("pb_auth", rawValue, {
        httpOnly: false,
        secure: true,
        sameSite: "lax",
        maxAge,
        path: "/",
      });
    }
  });

  return pb;
}
