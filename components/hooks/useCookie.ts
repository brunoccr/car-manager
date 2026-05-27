"use client";

import { useEffect, useState } from "react";

interface CookieOptions {
  path?: string;
  secure?: boolean;
  sameSite?: "Lax" | "Strict" | "None";
}

const setCookieUtil = (
  name: string,
  value: string = "",
  options: CookieOptions = {},
) => {
  if (typeof document === "undefined") return "";

  const { path = "/", secure = true, sameSite = "Lax" } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  cookieString += `; path=${path}`;
  cookieString += `; SameSite=${sameSite}`;
  if (secure) cookieString += "; Secure";

  document.cookie = cookieString;
};

const getCookieUtil = (name: string) => {
  if (typeof document === "undefined") return "";

  const escapedName = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1");

  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${escapedName}=([^;]*)`),
  );

  return matches ? decodeURIComponent(matches[1]) : "";
};

export function useCookie(
  name: string,
  value?: string,
): [string, (value: string) => void] {
  const [cookieName] = useState<string>(name);
  const [cookieValue, setCookieValue] = useState<string>(value || "");

  useEffect(() => {
    const currentValue = getCookieUtil(cookieName);

    if (currentValue) {
      (async () => {
        setCookieValue(currentValue);
      })();

      setCookieUtil(cookieName, currentValue);
    } else {
      (async () => {
        setCookieValue(value || "");
      })();
      setCookieUtil(cookieName, value);
    }
  }, [cookieName, value]);

  const setCookie = (value: string) => {
    setCookieUtil(cookieName, value);
    setCookieValue(value);
  };

  return [cookieValue, setCookie];
}
