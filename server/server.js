/*
    GLORY BE TO GOD,
    SYNAPSEVISION - SERVER,
    BY ISRAEL MAFABI EMMANUEL
*/

const express = require('express');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const cors = require('cors'); // Import cors

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors()); // Enable CORS for all routes
app.use(express.static('.')); // Serve static files from the current directory

app.post('/analyze', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'GEMINI_API_KEY not found in environment variables' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const imageBase64 = req.file.buffer.toString('base64');
        const mimeType = req.file.mimetype;

		const prompt = "Analyze the provided image and provide a detailed description of the primary object(s) within it. Following the description, generate a single, concise Google search query that would effectively locate information about the identified object(s). Always format the search query like this: Google_Query:(\"fully descriptive search term\"). If no appropriate search term can be generated, then do not return a Google_Query. Format the response using Markdown. Use headers, bold text, and lists where appropriate.";
        const imageParts = [
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: mimeType,
                },
            },
            { text: prompt },
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts: imageParts }],
        });

        const responseText = result.response.text();
        res.json({ result: responseText });

    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to analyze image' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});