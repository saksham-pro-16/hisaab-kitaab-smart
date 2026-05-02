import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const apiKey = "AIzaSyAmZTPpZYeEUqpW3xUBShhGgmZSz9vZoXM";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const imagePath = "C:\\Users\\SAKSHAM CHATURVEDI\\Pictures\\Screenshots\\Screenshot 2026-04-29 225948.png";

async function run() {
  try {
    const imageData = fs.readFileSync(imagePath);
    const base64Data = imageData.toString("base64");

    const prompt = `You are a smart billing assistant for an Indian Kirana store. Read this bill image. It may contain English and Hindi text. Extract the items, quantities, and unit prices.
Return ONLY a valid JSON array of objects with these exact keys:
- productId (string): Match with inventory ID. If no match, use "new".
- name (string): The extracted name or matched inventory name.
- qty (number): The quantity.
- price (number): The unit price.

Important: Output NOTHING else but the raw JSON array. Do NOT wrap in markdown code blocks.`;

    console.log("Sending to Gemini 2.5 Flash...");
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/png",
        },
      },
    ]);

    console.log("Extraction Result:");
    console.log(result.response.text());
  } catch (err) {
    console.error("Error:", err.message);
  }
}
run();
