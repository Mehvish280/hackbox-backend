const OpenAI = require("openai").default;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateTheory = async (req, res) => {
  try {
    const { path, topic, time } = req.body;

    console.log("➡️ REQUEST BODY:", req.body);

    if (!path || !topic || !time) {
      return res.status(400).json({
        message: "path, topic and time are required",
      });
    }

    const prompt = `
Generate theory content for students.

Path: ${path}
Topic: ${topic}
Reading time: ${time} minutes

Rules:
- Simple beginner-friendly language
- Clear explanation with paragraphs
- No quiz questions
- No code blocks
- No markdown
- Plain text only
`;

    // 🔹 OPENAI CALL
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt,
            },
          ],
        },
      ],
    });

    const theory =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text;

    if (!theory) {
      throw new Error("OpenAI returned empty theory");
    }

    // ✅ AI SUCCESS
    return res.status(200).json({
      theory,
      source: "ai",
    });

  } catch (error) {
    console.error("❌ OPENAI ERROR MESSAGE:", error.message);
    console.error("❌ OPENAI ERROR STATUS:", error.status);

    // 🔁 FALLBACK WHEN AI QUOTA / BILLING ISSUE
    if (error.status === 429) {
      return res.status(200).json({
        theory: `
SQL Injection is a web security vulnerability that occurs when an attacker
injects malicious SQL statements into input fields.

This allows attackers to read, modify, or delete sensitive data stored
inside a database.

SQL Injection occurs due to improper input validation and unsafe query
construction.

Common prevention methods include:
- Using prepared statements
- Input validation and sanitization
- Using ORM frameworks
- Applying least privilege principles
`,
        source: "fallback (AI quota exceeded)",
      });
    }

    // ❌ OTHER ERRORS
    return res.status(500).json({
      error: "OpenAI theory generation failed",
      details: error.message,
    });
  }
};

module.exports = { generateTheory };
