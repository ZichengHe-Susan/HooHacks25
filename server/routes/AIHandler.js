import express from 'express';
import fetch from 'node-fetch'; // Not needed if you're using Node 18+ with global fetch
import dotenv from 'dotenv';
import process from 'process';
import { buildPrompt } from '../../src/utils/promptBuilder.js';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/generate-tour-plan', async (req, res) => {
    const data = req.body;
    console.log('Received data:', data);

    try {
        const prompt = buildPrompt(data);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        const rawResponse = response.text;
        console.log('Raw response from Gemini API:', rawResponse);

        // Remove ```json and ``` if present in the response
        const jsonString = rawResponse.replace(/^```json\s*|\s*```$/g, '');

        // Parse the cleaned string into JSON
        const parsedPlan = JSON.parse(jsonString);

        // Send the parsed JSON object back to the client
        res.json({ plan: parsedPlan });

    } catch (error) {
        console.error('Error generating tour plan:', error);
        res.status(500).send("Error generating tour plan");
    }
});

export default router;
