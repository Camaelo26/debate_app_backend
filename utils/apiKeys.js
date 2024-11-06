const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,  // Use the API key from environment variables
});
const gemmaGroq = new Groq({
  apiKey: process.env.GEMMA2_API_KEY,  // New API key for Gemma
});
const mixtralGroq = new Groq({
  apiKey: process.env.MIXTRAL_API_KEY,  // New API key for mixtral
});
const LLamalGroq = new Groq({
  apiKey: process.env.LLAMA3_API_KEY,  // New API key for LLama3
});

async function getGPTResponse(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
}

async function getGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([prompt], { maxTokens: 500});
  return result.response.text();
}

async function getLLaMAResponse(prompt) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 500,
      top_p: 1,
    });

    // Instead of using `for await`, we directly access the response
    const response = chatCompletion.choices[0]?.message?.content || "No response received from LLaMA";
    return response;

  } catch (error) {
    console.error("Error fetching LLaMA response:", error);
    throw new Error("Failed to get response from LLaMA.");
  }
}

async function getGemmaResponse(prompt) {
  const chatCompletion = await gemmaGroq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gemma2-9b-it",
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    stream: false,
  });
  return chatCompletion.choices[0]?.message?.content;
}

async function getMixtralresponse(prompt) {
  const chatCompletion = await mixtralGroq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "mixtral-8x7b-32768",
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    stream: false,
  });
  return chatCompletion.choices[0]?.message?.content;
}

async function getGroqLLamaResponse(prompt) {
  const chatCompletion = await LLamalGroq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama3-groq-8b-8192-tool-use-preview",
    temperature: 0.5,
    max_tokens: 500,
    top_p: 0.5,
    stream: false,
  });
  return chatCompletion.choices[0]?.message?.content;
}


module.exports = {
  getGPTResponse,
  getGeminiResponse,
  getLLaMAResponse,
  getGemmaResponse,
  getMixtralresponse,
  getGroqLLamaResponse,  
};