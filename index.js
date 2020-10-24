const http = require('http');
const express = require('express');
const app = express();

app.get('/', async function(req, res) {
  const content = await getQuote();
  res.set('Access-Control-Allow-Origin', '*')
  res.send(content);
});

function getQuote() {
  const options = {
    host: 'api.forismatic.com',
    path: '/api/1.0/?method=getQuote&key=457653&format=json&lang=ru'
  };

  return new Promise(function(resolve) {
    http.request(options, function(res) {
      let result = '';
      res.on('data', (chunk) => { result += chunk });
      res.on('end', function() { resolve(result) });
    }).end();
  });
}

app.listen(process.env.PORT || 3000);