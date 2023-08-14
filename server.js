const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));  // Assuming your client side code is in 'public' directory

app.get('/api/youtube-data', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const playlistId = 'PLWtaU96FyQrLFQmUxxRwSn0ClIUmrLx__';  // Your playlist ID

    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
            params: {
                part: 'snippet',
                playlistId: playlistId,
                key: apiKey,
                maxResults: 50  // You can adjust this
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching YouTube data:", error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
