const express = require('express');

const app = express();

const hostname = '0.0.0.0'; // сервер запустим на всех интерфейсах
const PORT = process.env.PORT || 3001;

app.use(express.static(`${__dirname}/build`));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(PORT, hostname, () => {
  console.log(`listening on port ${PORT}! (in folder ${__dirname})`);
});