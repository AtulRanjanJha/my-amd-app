import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { number, strategy } = body;

  let amdResult = "unknown";
  let message = "";

  if (strategy === "jambonz") {
    await new Promise(r => setTimeout(r, 1200));
    amdResult = Math.random() > 0.5 ? "human" : "machine";
    message = `Simulated Jambonz SIP call to ${number}. AMD detected: ${amdResult}`;
  } else if (strategy === "twilio") {
    // Simulate (if you had real integration, call Twilio API here)
    await new Promise(r => setTimeout(r, 1200));
    amdResult = Math.random() > 0.7 ? "machine" : "human"; // Make it a little different
    message = `Simulated Twilio AMD call to ${number}. Twilio AMD: ${amdResult} (real API would go here)`;
  } else if (strategy === "huggingface") {
    // Simulate (real integration would call your Python ML API here)
    await new Promise(r => setTimeout(r, 1200));
    amdResult = Math.random() > 0.4 ? "human" : "machine";
    message = `Simulated Hugging Face ML call to ${number}. HF model AMD: ${amdResult} (real FastAPI proxy here)`;
  } else if (strategy === "gemini") {
    // Simulate Google Gemini voice analysis
    await new Promise(r => setTimeout(r, 1200));
    amdResult = Math.random() > 0.5 ? "machine" : "human";
    message = `Simulated Gemini 2.5 Flash call to ${number}. Gemini AMD: ${amdResult} (would send to Gemini API here)`;
  } else {
    message = "Unknown strategy. No call attempted.";
  }

  // Log every call to Prisma/DB
  await prisma.callLog.create({
    data: { phone: number, strategy, result: amdResult }
  });

  return NextResponse.json({
    message,
    result: amdResult,
    strategy,
    phone: number
  });
}
