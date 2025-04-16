const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: "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"
}));

app.post("/chat", async (req, res) => {
  const { message, model } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: model || "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("AI.verse backend corriendo en puerto 3000"));
