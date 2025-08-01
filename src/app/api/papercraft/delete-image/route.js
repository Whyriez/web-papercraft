import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// POST /api/papercraft/delete-image
export async function POST(req) {
  const { path } = await req.json();

  if (!path) {
    return NextResponse.json({ error: "No path provided" }, { status: 400 });
  }

  console.log("Deleting:", path);

  const bucket = path.split("/")[0]; // 'papercraft-images'
  const filePath = path.split("/").slice(1).join("/"); // 'filename.png'

  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}