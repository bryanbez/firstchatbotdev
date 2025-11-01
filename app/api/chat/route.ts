import * as fs from "fs";
import * as path from "path";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const gemini_ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

const TEXT_FILENAME = "CityInfo.txt";
const FILE_PATH = path.join(process.cwd(), "public", TEXT_FILENAME);

const TOPIC_NAME = "the content of the CityInfo.txt file";
const FALLBACK_TEXT =
  "I am only trained to answer questions based on the Caloocan City FactSheet up to 2019. Please ask a question related to that topic.";

// read the text file
let TOPIC_CONTENT = "";
try {
  TOPIC_CONTENT = fs.readFileSync(FILE_PATH, "utf8");
  if (TOPIC_CONTENT.length === 0) {
    console.warn("CityInfo.txt file is empty or removed");
  }
} catch (error) {
  console.error("Error reading CityInfo.txt file:", error);
  TOPIC_CONTENT = "Error: Topic Content is unavailable";
}

const systemInstruction = `You are a specialist information bot for ${TOPIC_NAME}. 
Use ONLY the following document content to answer questions: 
--- DOCUMENT CONTENT START ---
${TOPIC_CONTENT}
--- DOCUMENT CONTENT END ---
1. Only answer questions that can be directly sourced from the document content above.
2. If the user's question is NOT about ${TOPIC_NAME} OR if you cannot find the answer 
in the provided document, you MUST respond with the exact following phrase: "${FALLBACK_TEXT}"`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is missing in the request body" },
        { status: 400 }
      );
    }

    const response = await gemini_ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        temperature: 1.5,
        maxOutputTokens: 500,
        systemInstruction: systemInstruction,
      },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(generatedText);
    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
