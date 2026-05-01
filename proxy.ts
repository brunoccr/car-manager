import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@lib/pocketbase";

export async function proxy(request: NextRequest) {
  const pb = await createServerClient();

  try {
    await pb.collection("users").authRefresh();
  } catch {
    pb.authStore.clear();
  }

  const isLoggedIn = pb.authStore.isValid;
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  const isRootPage = request.nextUrl.pathname === "/";

  if (!isLoggedIn && (!isAuthPage || !isRootPage)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && (isAuthPage || isRootPage)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/activities/:path*"],
};
