import express from "express";

import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

const API_KEY = "AIzaSyA91XNxWtOV3juGB45WP4osPYtGQyltwlI";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

const result = await model.generateContent(prompt);
console.log(result.response.text());

app.use(express.json());

export default app;
