import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET detail by ID
export async function GET(request, context) {
  const { id } = context.params; // <--- Perbaikan di sini

  const { data, error } = await supabase
    .from("papercrafts")
    .select("*, menus(name)")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data });
}

// PUT update
export async function PUT(request, context) {
  const { id } = context.params;
  const body = await request.json();

  const { error, data } = await supabase
    .from("papercrafts")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(request, context) {
  const { id } = context.params;

  const { error } = await supabase
    .from("papercrafts")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ message: "Deleted" });
}

