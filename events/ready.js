require("dotenv").config();

module.exports = async (client) => {
  console.log(`[API] Logged in as ${client.user.username}, Have Fun!`);
  await client.user.setActivity(`${process.env.BioGame}help`, {
	//Use : LISTENING, WATCHING, PLAYING & STREAMING
    type: (process.env.BioGame),
  });
};
