import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET all menus
export async function GET() {
  const { data, error } = await supabase
    .from("menus")
    .select("id, name, parent_id, sort_order")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data });
}

// POST create menu
export async function POST(req) {
  const body = await req.json();
  const { name, parent_id, sort_order = 0 } = body;

  const { data, error } = await supabase
    .from("menus")
    .insert([{ name, parent_id: parent_id || null, sort_order }])
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data }, { status: 201 });
}
