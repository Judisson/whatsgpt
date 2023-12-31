const { sendMessageGPT, responseMessageWhats } = require("../class/instance");

exports.QuestionToGPT = (req, res) => {
  sendMessageGPT(req.body.question)
    .then((response) => {
      responseMessageWhats(response.choices[0].message.content)
      return res
        .status(200)
        .json({ resposta: response.choices[0].message.content });
    })
    .catch((err) => {
      console.error("erro: ", err);
      return res.status(500).json({ error: err.message });
    });
};
