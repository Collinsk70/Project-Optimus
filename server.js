import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;
const serpApiKey = "721ec6a6ffdc5dbaa95fbada15ebc9b92f58e99ecc0cd165ee917fc8ee4f763e"; // Keep this secret!

app.use(cors());

// Proxy endpoint to query SerpAPI
app.get("/ask", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).send("Missing query.");

    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=en&api_key=${serpApiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching answer from SerpAPI.");
    }
});

app.listen(PORT, () => console.log(`Proxy running at http://localhost:${PORT}`));
