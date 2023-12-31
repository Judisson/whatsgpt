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
      return response.choices[0].message.content;
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
      return response.data;
    })
    .catch((err) => {
      console.error('Erro ao enviar mensagem:');
    });
}

module.exports = { sendMessageGPT, responseMessageWhats }
