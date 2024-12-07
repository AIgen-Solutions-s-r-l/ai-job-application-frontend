import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { data }: { data: { access_token: string } } = await axios.post(
      `${process.env.AUTH_API_URL}/auth/login`,
      {
        "username": process.env.RESUMES_USERNAME,
        "password": process.env.RESUMES_PASSWORD
      }
    )
    const token = data.access_token

    const rewFormData = await req.formData();
    const file = rewFormData.get("file") as File;

    const formData = new FormData();
    formData.append('pdf_file', file);

    const res = await axios.post(`${process.env.RESUMES_API_URL}/resumes/pdf_to_json`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      }
    })

    return NextResponse.json({ filename: file.name, status: res.status, data: res.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: error.response.status });
  }
}
