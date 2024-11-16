import { createClient } from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  const supabase = createClient();
  const { data, error } = await supabase
    .storage
    .from('job_rizzler')
    .download(path);

  return new NextResponse(data, {
    headers: {
      'Content-Type': data.type
    }
  })
}