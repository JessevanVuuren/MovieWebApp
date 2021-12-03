// import express, { Router } from 'express';
// import serverless from "serverless-http";
'use strict';
const serverless = require('serverless-http');

const express = require('express');


const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.resolve('pages/index.html'))
});

app.use("/.netlify/functions/server", router)
app.use('/', (req, res) => res.sendFile(path.resolve('pages/index.html')));

//export const handler = serverless(app);

module.exports = app;
module.exports.handler = serverless(app)