import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

const app = express();
app.listen(5000, console.log('Server is running on 5000'));

function handleRender(req, res) {
  const html = ReactDOMServer.renderToString(<App />);

  fs.readFile('../build/index.html', 'utf8', function (err, data) {
    if (err) throw err;

    const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);

    res.send(document);
  });
}


app.use('/build', express.static(path.join(__dirname, 'build')));

app.get('*', handleRender);
