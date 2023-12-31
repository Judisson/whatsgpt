const dotenv = require("dotenv").config();
const axios = require("axios");

const OpenAI = require("openai");
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: OPEN_AI_KEY });

const sendMessageGPT = (question) => {
  return openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: question,
        },
      ],
    })
    .then((response) => {
      console.log("----------------------------------------------------------");
      console.log("\n");
      console.log("Resposta do chatGPT: ", response.choices[0].message.content);
      console.log("\n");
      console.log("----------------------------------------------------------");
      // responseMessageWhats(response.choices[0].message.content)
      return response;
    })
    .catch((error) => {
      throw error;
    });


};

const responseMessageWhats = (messageResponse) => {
  return axios
    .post(
      process.env.URL_SERVER_API_WHATS,
      {
        resposta: messageResponse,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      console.log('----------------------------------------------------------');
      console.log('\n');
      console.log('Resposta do chatGPT: ', response);
      console.log('\n');
      console.log('----------------------------------------------------------');
      return response;
    })
    .catch((err) => {
      console.error('Erro ao enviar mensagem:');
    });
}

module.exports = { sendMessageGPT, responseMessageWhats }
