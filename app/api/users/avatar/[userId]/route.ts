import { createServerClient } from "@/lib/pocketbase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const userId = (await params).userId;

  const pb = await createServerClient();
  let user;

  try {
    user = await pb.collection("users").getOne(userId);
  } catch {
    return new NextResponse(null, { status: 404 });
  }

  if (user.avatar) {
    const url = pb.files.getURL(user, user.avatar);

    const response = await fetch(url);

    const blob = await response.arrayBuffer();

    return new NextResponse(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } else {
    return new NextResponse(
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUHNgYVFAwaC5iU7wAAAnVJREFUeNrtm79rVEEQxz9m773LRYwRFTVpFCwS0ggWBlKlsbCzsLDSXmws/COCNpZ2WlhZWIjYp7GxFZOfYKWgEowgInIhz93u7Y3Fm7vLe7m7vY97G8EDy93O7MzsfeY3uzsHAoFAIBAIBAKBQCDYI+g0w+EAn6FpLwH6gPvAa8fMeeAVMAvctXscw6i9mHHACHDX6C9hBvjeZp8D7B8pGvAtwAnwB/CAnUAv8I4W8gW4XwR+b588wAdpCPhmC6kAnwP83S79Xsh+2wJgGvhSAn4bYAzYBNYBm8BlwG/wH6SAnwXOW6kXgN+6o9WkCHvNfALv398w646vWj9g0PivYBb4BlwB7gE/0lIOfAIuA29CshwP6Y8wA7wEboZkvg7wUfU+2Y0oM20P4AFbQDwEvBwY8Bvh2XoX8A763wXgN9rVHgH+N+AZMAnMAg9b0Aas9hTwvUqP7wI+6AAnzG8D6F+Z2YjV7m2P6R3gswm8K8CfM+8/4Zg+9D8FvG0D8GnMvD/RofYK8OfN/69DshwN6ZuwfXwD+N/Al80/gDftS8D92B60K8BPGv0lTBfU31Xgrg39X0G+346SAsT27y/7rC2DfsE04H0P8O3wK6jH8f/XbWb/O8BvFfMv4Cdg2vD/EfgOqOfTzL/aWwIesQ/7w99D9lHw783777oE/E1zR408R8EfeN+Nf96XpSngV+O6YbyrZidHhA/gXw6/+wL++B7X+9+uBPyv8A7o2T8Y8CgQCAQCgUAgEAgEAsEex78CPrvR0P8wYAAAAABJRU5ErkJggg==",
        "base64",
      ),
      {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      },
    );
  }
}
