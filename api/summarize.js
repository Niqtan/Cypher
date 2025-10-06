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
          content: `You are an expert content summarizer that provides in-depth yet concise summaries.

You are given:
1. The main article content: ${text}
2. Optional linked article contents (depth 1 — links directly referenced in the main article).

Your goal:
- Create a clear, detailed summary (3–5 setences).
- Include the main points, arguments, and examples.
- When relevant, use information from the linked articles to explain terms or context mentioned in the main article.
- Do NOT just list headings or bullet points — write a cohesive narrative.
- Avoid unnecessary filler text or phrases like “In conclusion.”
Structure your output as follows:

---
Main Summary:


\n\nKey Takeaways:
• Point 1  
• Point 2  
• Point 3  
---`
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

