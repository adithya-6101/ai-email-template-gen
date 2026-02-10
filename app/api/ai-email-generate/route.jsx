import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key Missing" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // USE A VALID MODEL FROM YOUR LIST
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "application/json", // Flash models support JSON mode
      },
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const aiResp = result.response.text();

    console.log("--- RAW AI RESPONSE ---");
    console.log(aiResp);
    console.log("-----------------------");

    // Clean Markdown code blocks (Just in case)
    const cleanedResponse = aiResp
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonResponse = JSON.parse(cleanedResponse);
    return NextResponse.json(jsonResponse);
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json(
      { error: e.message || e.toString() },
      { status: 500 },
    );
  }
}
