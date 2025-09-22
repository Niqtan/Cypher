import Groq from "groq-sdk"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({error: "Method not allowed"})
  }
    const { text } = req.body //This is the pageText variable

    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
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
    res.status(200).json({summary})
  }
  catch (err) {
    console.error("API Error: ", err)
    res.status(500).json({error: "Something went wrong"})
  }
}

