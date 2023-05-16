const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = 80;

const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;
const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const payload = req.body;
  const data = {
    chat_id: chatId,
    text: JSON.stringify(payload)
  };
  request.post({ url: telegramUrl, json: data }, (error, response, body) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error');
    }
    return res.json(body);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
