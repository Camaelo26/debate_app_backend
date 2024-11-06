const { getGPTResponse, getGeminiResponse, getLLaMAResponse, getGemmaResponse, getMixtralresponse , getGroqLLamaResponse } = require('../utils/apiKeys');

// Fetch referee's score based on the selected API (GPT-4, Gemini, LLaMA, Gemma,Mixtral, GroqLLama)
async function getRefereeScore(referee, argument1, argument2,topic) {
  const debatePrompt = `Evaluate the arguments provided:
  Topic : ${topic}
  Debater 1: ${argument1}
  Debater 2: ${argument2}
  
  No matter what you have to give a score out of 10 for each debater and a short remark for each debater. Use this exact format:
  
  Debater 1 Score: [score]/10
  Remark: [remark]
  
  Debater 2 Score: [score]/10
  Remark: [remark]`;

  let refereeResponse;
  
  try {
    // Get response from the appropriate AI
    if (referee === "GPT-4") {
      refereeResponse = await getGPTResponse(debatePrompt);
    } else if (referee === "Gemini") {
      refereeResponse = await getGeminiResponse(debatePrompt);
    } else if (referee === "LLaMA") {
      refereeResponse = await getLLaMAResponse(debatePrompt);
    } else if (referee === "Gemma") {
      refereeResponse = await getGemmaResponse(debatePrompt);
    } else if (referee === "Mixtral") {
      refereeResponse = await getMixtralresponse(debatePrompt);
    } else if (referee === "GroqLlama") {
      refereeResponse = await getGroqLLamaResponse(debatePrompt);
    }



  console.log("referee response:",refereeResponse);
  // Sanitize the response: remove markdown-style ** and other unwanted characters
  refereeResponse = refereeResponse.replace(/\*\*/g, '').replace(/##/g, '');

    const scoreRegex = /Debater 1 Score:\s*(\d+(\.\d+)?)\/10\s*Remark:\s*(.+)\s*Debater 2 Score:\s*(\d+(\.\d+)?)\/10\s*Remark:\s*(.+)/i;
    const match = scoreRegex.exec(refereeResponse);

    if (match) {
      const debater1Score = match[1] || "N/A";
      const debater1Remark = match[3] || "No remark";
      const debater2Score = match[4] || "N/A";
      const debater2Remark = match[6] || "No remark";

      return {
        debater1: { score: debater1Score, remark: debater1Remark },
        debater2: { score: debater2Score, remark: debater2Remark }
      };
    } else {
      return {
        debater1: { score: "0", remark: "No valid score" },
        debater2: { score: "0", remark: "No valid score" }
      };
    }
  } catch (error) {
    return {
      debater1: { score: "0", remark: "Error during evaluation" },
      debater2: { score: "0", remark: "Error during evaluation" }
    };
  }
}

module.exports = { getRefereeScore };
