import { GenerateEmailTemplateAIModel } from "@/config/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);
    const aiResponse = await result.response.text();

    // Return response correctly
    return new NextResponse(aiResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
