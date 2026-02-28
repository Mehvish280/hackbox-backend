const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateReading(topic, time) {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: `Explain ${topic} for a beginner.
Reading time: ${time} minutes.
Use simple language.
Give one real-life example.
Avoid unnecessary theory.`,
  });

  return response.output_text;
}

async function generateMCQs(topic, difficulty) {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: `Generate 5 MCQs on ${topic}.
Difficulty: ${difficulty}.
Each question must have 4 options.
Clearly mention the correct answer.`,
  });

  return response.output_text;
}

module.exports = {
  generateReading,
  generateMCQs,
};
