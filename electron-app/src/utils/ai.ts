import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const safety = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const HIDDEN_COT =
  "You will think through this request step-by-step internally; don't expose your reasoning.";

export async function aiRequest(
  action: "summarize" | "rewrite" | "translate" | "extract",
  text: string,
  key: string,
): Promise<string> {
  if (!key) throw new Error("No API key set");

  const gen = new GoogleGenerativeAI(key);
  const prompt = {
    summarize: "Summarize concisely:",
    rewrite: "Rewrite clearly:",
    translate: "Translate to English:",
    extract: "Extract emails, dates, numbers:",
  }[action];

  const model = gen.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    systemInstruction: `${HIDDEN_COT}\n\n${prompt}`,
  });

  const chat = model.startChat({
    safetySettings: safety,
    generationConfig: { temperature: 0.6, topP: 0.9, maxOutputTokens: 1024 },
  });

  const res = await chat.sendMessage(text);
  return res.response.text();
}
