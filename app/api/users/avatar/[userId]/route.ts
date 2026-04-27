import { createServerClient } from "@/lib/pocketbase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const userId = (await params).userId;
  const pb = await createServerClient();
  const user = await pb.collection("users").getOne(userId);
  const url = pb.files.getURL(user, user.avatar);

  const response = await fetch(url);

  const blob = await response.arrayBuffer();

  return new NextResponse(blob, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
