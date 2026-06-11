import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateSummary(content: string): Promise<string> {
  const prompt = `You are a helpful study assistant. Summarize the following notes in 3-5 clear, concise bullet points that a student can quickly review before an exam. Be specific and focus on key concepts.\n\nNotes:\n${content}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateQuiz(content: string): Promise<string> {
  const prompt = `You are a helpful study assistant. Based on the following notes, generate 5 multiple choice questions to test understanding. Format each question exactly like this:\n\nQ1. [Question]\nA. [Option]\nB. [Option]\nC. [Option]\nD. [Option]\nAnswer: [Correct letter]\n\nNotes:\n${content}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function explainContent(content: string, level: "beginner" | "high_school" | "university"): Promise<string> {
  const levelMap = {
    beginner:    "a 10-year-old child with no prior knowledge",
    high_school: "a high school student with basic knowledge",
    university:  "a university student who understands technical concepts",
  };
  const prompt = `You are a helpful study assistant. Explain the following notes as if you are talking to ${levelMap[level]}. Use simple language appropriate for that level, give examples where helpful, and make it engaging.\n\nNotes:\n${content}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
