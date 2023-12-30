require("dotenv").config();
const express = require("express");
const axios = require("axios");

const OpenAI = require("openai");
const { response } = require("express");

const app = express();

app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

// axios
//   .post(
//     "https://api.openai.com/v1/chat/completions",
//     {
//       model: "gpt-3.5-turbo",
//       message: [
//         {
//           role: "system",
//           content: "Tem 4 patas, tem media e mia. Quem sou eu? ",
//         },
//       ],
//       // max_tokens: 64,
//       response_format: { type: "json_object" },
//       // stop: ["\n"]
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
//         "Content-Type": "application/json",
//       },
//     }
//   )
//   .then((response) => {
//     console.log("Resposta: ", response);
//     console.log(
//       "---------------------------------------------------------------------------"
//     );
//     console.log("\n");
//     console.log("Resposta do chatGPT: ", response.choices[0].message.content);
//     console.log(
//       "---------------------------------------------------------------------------"
//     );
//     console.log("\n");
//   })
//   .catch((error) => {
//     console.error("erro", error);
//   });
//  {
//   try {
//     const response = await openai.createCompletion({
//     })

//     return res.status(200).json({
//       success: true,
//       data: response.data.choices[0].text
//     })
//   } catch (error) {
//     console.log("Erro ao acessar: ", error)
//     return res.status(400).json({
//       success: false,
//       error: error.response ? error.response.data : "Não rolou"
//     })
//   }
// })
const API_URL = "https://api.openai.com/v1/chat";
const TOKEN = process.env.OPEN_AI_KEY;
const bodyPrompt = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "Tem 4 patas, tem media e mia. Quem sou eu? ",
    },
  ],
};

// const sendMessage = async (to, message) => {
//   try {
//     const response = await openai.chat.completions.create(
//       bodyPrompt
//     );
//     console.log(
//       "---------------------------------------------------------------------------"
//     );
//     console.log("\n");
//     console.log("Resposta do chatGPT: ", response.choices[0].message.content);
//     console.log(
//       "---------------------------------------------------------------------------"
//     );
//     console.log("\n");
//   } catch (error) {
//     console.error("Erro ao enviar mensagem: ");
//     throw error;
//   }
// };

const sendMessageGPT = (to, message) => {
  openai.chat.completions
    .create(bodyPrompt)
    .then((response) => {
      console.log(
        "---------------------------------------------------------------------------"
      );
      console.log("\n");
      console.log("Resposta do chatGPT: ", response.choices[0].message.content);
      console.log("\n");
      console.log(
        "---------------------------------------------------------------------------"
      );
    })
    .catch((error) => {
      console.error("erro", error);
    });
};

sendMessageGPT();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
