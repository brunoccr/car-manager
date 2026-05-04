import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@lib/pocketbase";

export async function proxy(request: NextRequest) {
  const pb = await createServerClient();

  const isRootPage = request.nextUrl.pathname === "/";

  console.log("isRootPage", isRootPage);

  if (isRootPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await pb.collection("users").authRefresh();
  } catch {
    pb.authStore.clear();
  }

  const isLoggedIn = pb.authStore.isValid;
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

  console.log("isLoggedIn", isLoggedIn);
  console.log("isAuthPage", isAuthPage);

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && (isAuthPage || isRootPage)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login/:path*",
    "/dashboard/:path*",
    "/activities/:path*",
    "/garage/:path*",
  ],
};
