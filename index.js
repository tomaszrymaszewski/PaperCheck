const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('MathCheck is running');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
