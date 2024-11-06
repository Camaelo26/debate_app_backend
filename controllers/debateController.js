const { getDebaterResponse } = require('../services/debaters');
const { getRefereeScore } = require('../services/referee');

// Controller function to manage the debate process
async function startDebate(req, res) {
  const { debater1, debater2, referee1, referee2, referee3, referee4, topic, debater1Role, debater2Role } = req.body;
  let debateResults = [];

  let debater1TotalScore = 0;
  let debater2TotalScore = 0;

  // Simulate 5 rounds of debate
  for (let i = 0; i < 5; i++) {
    
    const argument1 = await getDebaterResponse(debater1, topic, debater1Role);
    const argument2 = await getDebaterResponse(debater2, topic, debater2Role);

    const referee1Result = await getRefereeScore(referee1, argument1, argument2);
    const referee2Result = await getRefereeScore(referee2, argument1, argument2);
    const referee3Result = await getRefereeScore(referee3, argument1, argument2);
    const referee4Result = await getRefereeScore(referee4, argument1, argument2);

    // Calculate the scores and store results 
    const debater1Score = (parseInt(referee1Result.debater1.score) || 0) + (parseInt(referee2Result.debater1.score) || 0) + (parseInt(referee3Result.debater1.score) || 0) + (parseInt(referee4Result.debater1.score) || 0);
    const debater2Score = (parseInt(referee1Result.debater2.score) || 0) + (parseInt(referee2Result.debater2.score) || 0) + (parseInt(referee3Result.debater2.score) || 0) + (parseInt(referee4Result.debater2.score) || 0);

    debater1TotalScore += debater1Score / 2;
    debater2TotalScore += debater2Score / 2;

    debateResults.push({
      round: i + 1,
      argument1,
      argument2,
      referee1: referee1Result,
      referee2: referee2Result,
      referee3: referee3Result,
      referee4: referee4Result,
    });
  }

  let winner = debater1TotalScore > debater2TotalScore ? req.body.debater1 : req.body.debater2;
  if (debater1TotalScore === debater2TotalScore) {
    winner = "Tie";
  }

  res.json({
    debateResults,
    debater1TotalScore,
    debater2TotalScore,
    winner,
  });
}


module.exports = { startDebate };
