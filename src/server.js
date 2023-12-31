require("dotenv").config();
const express = require("express");
const axios = require("axios");


const app = require('./config/express');

// app.use(express.json());



// const bodyPrompt = {
//   model: "gpt-3.5-turbo",
//   messages: [
//     {
//       role: "system",
//       content: "Tem 4 patas, tem media e mia. Quem sou eu? ",
//     },
//   ],
// };

// const sendMessageGPT = (question) => {
  
// };

// sendMessageGPT();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
