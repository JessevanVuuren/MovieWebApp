import express, { Router } from 'express';
import serverless from "serverless-http";

const app = express();
import path from 'path';
const router = Router();

router.get('/', function (req, res) {
    console.log(path.join(__dirname + 'index.html'))
    //res.sendFile('index.html', { root: __dirname });
    res.sendFile(path.resolve('src/index.html'))
});

app.use("/.netlify/functions/api", router)


export const handler = serverless(app);