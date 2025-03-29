import express from 'express';
import {Configuration, OpenAIApi} from 'openai';
import { buildPrompt } from '../../utils/promptBuilder.js';

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openaiClient = new OpenAIApi(configuration);

// Endpoint to handle OpenAI API calls
router.post('/generate-tour-plan', async (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    // console.log('Received data:', data);

    try {

        // Build the prompt using your existing function
        const prompt = buildPrompt(data);

        // Call OpenAI API
        const response = await openaiClient.createChatCompletion({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt }
            ]
        });

        // Send the response back to the client
        res.json(response.choices[0].message.content);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating tour plan 111");
    }
});

export default router;