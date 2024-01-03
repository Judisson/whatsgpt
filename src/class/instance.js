const dotenv = require("dotenv").config();
const axios = require("axios");

const OpenAI = require("openai");
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: OPEN_AI_KEY });

const sendMessageGPT = async (objMessageGPT) => {
  console.log("9(instance.js) - objMessageGPT:", objMessageGPT);
  let { contact_number, question, type } = objMessageGPT;
  let data = await openai.chat.completions
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
      console.log("22 - REsponse:", response.choices[0].message);
      objMessageResponseWhats = {
        contact_number,
        response_question: response.choices[0].message.content,
        type,
      };
      return objMessageResponseWhats;
    })
    .catch((error) => {
      throw error;
    });

  console.log("34(instance.js) - sendMessageGPT: ", data);
  return data;
};

const responseMessageWhats = async (objMessageResponse) => {
  console.log("38(instance.js) - objMessageResponse: ", objMessageResponse);
  let { contact_number, response_question, type } = objMessageResponse;
  let data = await axios
    .post(
      process.env.URL_SERVER_API_WHATS,
      {
        contact_number,
        response_question,
        type,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("56 - response: ", response);
      console.log("\n");
      console.log("----------------------------------------------------------");
      console.log("\n");
      console.log("60 - response: ", response.data);
      console.log("\n");
      console.log("----------------------------------------------------------");
      return response.data;
    })
    .catch((err) => {
      console.error("Erro ao enviar mensagem");
    });
  console.log("62(instance.js) - data: ", data);
  return data;
};

module.exports = { sendMessageGPT, responseMessageWhats };
