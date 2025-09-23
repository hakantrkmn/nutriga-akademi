import { updateBlogPosts, updateCourses } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Secret key for authentication (use environment variable in production)
const SECRET_KEY = process.env.REVALIDATION_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${SECRET_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { path, type } = await request.json();

    // Validate request
    if (!path && !type) {
      return NextResponse.json(
        { error: "Path or type required" },
        { status: 400 }
      );
    }

    // Revalidate specific paths
    if (path) {
      revalidatePath(path);
      console.log(`✅ Revalidated path: ${path}`);
    }

    // Revalidate by content type and update Redis cache
    if (type) {
      switch (type) {
        case "home":
          revalidatePath("/");
          console.log("✅ Revalidated home page");
          break;

        case "blog":
          revalidatePath("/");
          revalidatePath("/blog");
          revalidatePath("/blog/[slug]");
          await updateBlogPosts();
          console.log("✅ Revalidated blog pages and updated Redis cache");
          break;

        case "courses":
          revalidatePath("/");
          revalidatePath("/egitimler");
          revalidatePath("/egitimler/[slug]");
          await updateCourses();
          console.log("✅ Revalidated course pages and updated Redis cache");
          break;

        case "hero":
          revalidatePath("/");
          console.log("✅ Revalidated hero slides");
          break;

        default:
          return NextResponse.json(
            { error: "Invalid type specified" },
            { status: 400 }
          );
      }
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      path,
      type,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: "Revalidation API is working",
    usage: 'POST with { path: \"/\", type: "blog" }',
  });
}
