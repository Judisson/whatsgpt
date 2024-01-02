const dotenv = require("dotenv").config();
const axios = require("axios");

const OpenAI = require("openai");
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: OPEN_AI_KEY });

const sendMessageGPT = async (objMessageGPT) => {
  console.log("9 - objMessageGPT:", objMessageGPT)
  let { contact_number, question, type } = objMessageGPT;
  return data = await openai.chat.completions
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
      console.log("22 - REsponse:", response.choices[0].message)
      objMessageResponseWhats = {
        contact_number,
        response_question: response.choices[0].message.content,
        type
      }
      return objMessageResponseWhats;
    })
    .catch((error) => {
      throw error;
    });

    console.log("34 - sendMessageGPT: ",data)
};

const responseMessageWhats = async (objMessageResponse) => {
  console.log("38 - objMessageResponse: ", objMessageResponse)
  let { contact_number, response_question, type } = objMessageResponse;
  let data = await axios
    .post(
      process.env.URL_SERVER_API_WHATS,
      {
        contact_number,
        response_question,
        type
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("54 - response: ", response)
      return response;
    })
    .catch((err) => {
      console.error("Erro ao enviar mensagem");
    });
    console.log("60 - data: ", data)
    return data
};

module.exports = { sendMessageGPT, responseMessageWhats };
