import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App.jsx';

function handleRender(req, res) {
  const html = ReactDOMServer.renderToString(<App />);

  fs.readFile('../build/index.html', 'utf8', function (err, data) {
    if (err) throw err;

    const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);

    res.send(document);
  });
}

const app = express();

app.use('/build', express.static(path.join(__dirname, 'build')));

app.get('*', handleRender);

app.listen(3000);