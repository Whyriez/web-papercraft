import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET single menu
export async function GET(_, { params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from("menus")
    .select("id, name, parent_id, sort_order")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error }, { status: 404 });

  return NextResponse.json({ data });
}

// PUT update menu
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const { name, parent_id, sort_order = 0 } = body;

  const { data, error } = await supabase
    .from("menus")
    .update({ name, parent_id: parent_id || null, sort_order })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data });
}

// DELETE menu
export async function DELETE(request, context) {
  const { id } = await context.params;

  const { error } = await supabase.from("menus").delete().eq("id", id);

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ message: "Menu deleted" });
}