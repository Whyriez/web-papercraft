import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const { data, error: uploadError  } = await supabase.storage
    .from("papercraft-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

 if (uploadError) {
  console.error("Upload failed:", uploadError); // <- log ke terminal
  return NextResponse.json({ error: uploadError.message }, { status: 500 });
}


  const { data: urlData } = supabase.storage
    .from("papercraft-images")
    .getPublicUrl(fileName);

  return NextResponse.json({ url: urlData.publicUrl });
}
