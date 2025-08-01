import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET all papercrafts (with optional category_id)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category_id = searchParams.get("category_id");
  const search = searchParams.get("search");
  const difficulty = searchParams.get("difficulty");
  const limit = parseInt(searchParams.get("limit") || "6");
  const offset = parseInt(searchParams.get("offset") || "0");

  let baseQuery = supabase
    .from("papercrafts")
    .select("*, menus(name)", { count: "exact" })
    .order("created_at", { ascending: false });

  if (category_id) baseQuery = baseQuery.eq("category_id", category_id);
  if (search) baseQuery = baseQuery.ilike("title", `%${search}%`);
  if (difficulty) {
    const difficulties = difficulty.split(",");
    baseQuery = baseQuery.in("difficulty", difficulties);
  }

  const { data, count, error } = await baseQuery.range(
    offset,
    offset + limit - 1
  );

  if (error) return Response.json({ error }, { status: 500 });
  return NextResponse.json({ data, total: count });
}

// POST create new papercraft
export async function POST(request) {
  const body = await request.json();
  const { error, data } = await supabase
    .from("papercrafts")
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data });
}
