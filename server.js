import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/get-gender', async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ error: 'Missing name parameter' });
    }

    try {
        const apiKey = process.env.GENDER_API_KEY;
        const url = `https://gender-api.com/get?name=${name}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        res.json({ gender: data.gender });
    } catch (error) {
        console.error('Error fetching gender:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
