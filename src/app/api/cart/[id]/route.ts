import { cartRemove, cartUpdateQty } from "@/lib/redis";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

async function getUserId() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // educationId
    const body = await request.json();
    const { quantity } = body as { quantity: number };

    const userId = await getUserId();
    if (!userId)
      return NextResponse.json(
        { success: false, error: "Giriş gerekli" },
        { status: 401 }
      );

    await cartUpdateQty(userId, id, quantity);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart PATCH error:", error);
    return NextResponse.json(
      { success: false, error: "Sepet güncellenemedi" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // educationId
    const userId = await getUserId();
    if (!userId)
      return NextResponse.json(
        { success: false, error: "Giriş gerekli" },
        { status: 401 }
      );
    await cartRemove(userId, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Sepet öğesi silinemedi" },
      { status: 500 }
    );
  }
}
