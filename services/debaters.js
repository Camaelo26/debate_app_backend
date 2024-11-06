const { getGPTResponse, getGeminiResponse, getLLaMAResponse, getGemmaResponse, getMixtralresponse,getGroqLLamaResponse } = require('../utils/apiKeys');
const { sharedLogic } = require('../utils/common'); // Example shared logic if needed

// Fetch debater's response based on the selected API
async function getDebaterResponse(debater, topic, role) {
  const prompt = `${role}: ${topic}`;

  if (debater === "GPT-4") {
    return await getGPTResponse(prompt); // Using OpenAI GPT-4
  } else if (debater === "Gemini") {
    return await getGeminiResponse(prompt); // Using Gemini API
  } else if (debater === "LLaMA") {
    return await getLLaMAResponse(prompt); // Using LLaMA API
  } else if (debater === "Gemma") {
    return await getGemmaResponse(prompt); // Using Gemma API
  } else if (debater === "Mixtral") {
    return await getMixtralresponse(prompt); // Using mixtral API
  } else if (debater === "GroqLlama") {
    return await getGroqLLamaResponse(prompt); // Using GroqLlama API
  }
}


module.exports = { getDebaterResponse };
