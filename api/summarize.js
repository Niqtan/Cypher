require("dotenv").config()
const Groq = require("groq-sdk")
const cors = require("cors")
const express = require("express")

const corsOptions = {
  origin: ["http://localhost:5173",
    "https://cypher-1wc7u5n7t-niqs-projects-c135a7ed.vercel.app"
  ],
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/', async (req, res) => {
  const { text } = req.body //This is the pageText variable

  try {    
    const chatCompletion  = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes text on webpages."
        },
        {
          role: "user",
          content: `Summarize the text on the webpage and talk like you're cypher from valorant into two sentences: \n\n${text}`
        },
      ],
      model: "openai/gpt-oss-20b",
    });

    const summary = chatCompletion.choices[0]?.message?.content || "No summary generated.";
    res.json({summary})
  }
  catch (err) {
    console.error("Groq fucked up lmao: ", err)
  }
})


module.exports = app