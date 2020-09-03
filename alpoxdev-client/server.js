const express = require('express');
const serverless = require('serverless-http');
// const { parse } = require('url');

const isDev = process.env.NODE_ENV !== 'production';
const getPage = (page) => require(`./.next/serverless/pages/${page}`).render;

const app = express();
app.use(express.static(`${__dirname}/public`));

app.get('/', getPage('index'));
app.get('/auth', getPage('auth'));
app.get('/auth/login', getPage('auth/login'));
app.get('/auth/register', getPage('auth/register'));

// info
app.get('/robots.txt', getPage('robots.txt'));

app.use('/_next/static', express.static('./.next/static'));
app.get('*', require('./.next/serverless/pages/_error').render);

isDev &&
    app.listen(3000, function () {
        console.log(`Ready on localhost:3000`);
    });

exports.handler = serverless(app);
