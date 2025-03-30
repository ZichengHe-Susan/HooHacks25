import express from 'express';
import fetch from 'node-fetch';         // If you're using Node 18+, you can use the built-in fetch API instead of installing node-fetch
import dotenv from 'dotenv';
import process from 'process';
import { buildPrompt } from '../../src/utils/promptBuilder.js';


dotenv.config(); // Loads .env variables into process.env (e.g. HF_API_TOKEN)

const router = express.Router();

// Example route: POST /api/huggingface
router.post('/generate-tour-plan', async (req, res) => {
  try {
    // 1. Get input from request body (e.g. user prompt)
    const prompt = buildPrompt(req.body);
    // console.log('Prompt:', prompt);

    // 2. Define the Hugging Face model endpoint
    //    For example, using "gpt2" as a text-generation model:
    const modelUrl = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1';

    // 3. Make the request to the Hugging Face Inference API
    const hfResponse = await fetch(modelUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });

    // 4. Check the response and parse
    if (!hfResponse.ok) {
      throw new Error(`Hugging Face Inference API error: ${hfResponse.statusText}`);
    }
    const data = await hfResponse.json();

    // data will vary based on the model. For text generation models, you might get something like:
    // [{ "generated_text": "...some response..." }]
    // You can format or extract relevant parts before sending back
    res.json({ output: data });
  } catch (error) {
    console.error('[HuggingFaceHandler Error]', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
