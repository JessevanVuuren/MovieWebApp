import { } from 'dotenv/config'
import fetch from 'node-fetch'
import { resolve } from 'path'
import express from 'express'
import { readFile, readFileSync } from "fs"

const app = express()

const port = process.env.PORT || 3000
const API = process.env.KEY

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/movie', (req, res) => {
    const css = readFileSync(resolve("pages/style.css"), "utf8")
    readFile(resolve('pages/index.html'), 'utf8', async (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }

        // get id
        const movieID = req.query.id;
        if (!movieID) return res.redirect('/');

        const data = await getImgUrl(movieID)
        console.log("Request for: " + data["title"])  

        htmlData = htmlData
            .replace(/{{movieName}}/g, data["title"])
            .replace(/{{posterPathW500}}/g, "https://image.tmdb.org/t/p/w500" + data["poster_path"])
            .replace(/{{posterPathW185}}/g, "https://image.tmdb.org/t/p/w185" + data["poster_path"])
            .replace(/{{movieDescription}}/g, data["overview"])
            .replace(/{{backDropW500}}/g, "https://image.tmdb.org/t/p/w500" + data["backdrop_path"])
            .replace("{{style}}", "<style>"+ css +"</style>")
        
        return res.send(htmlData);
    });
})

app.get('/.well-known/assetlinks.json', (req, res) => {
    return res.sendFile(resolve('assetlinks.json'))
})
app.get('/.well-known/apple-app-site-association', (req, res) => {
    return res.sendFile(resolve('apple-app-site-association'))
})

app.listen(port, () => {
    console.log("Example app listening at http://localhost:" + port)
})

const getImgUrl = async (movieID) => {
    const rawData = await fetch("https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + API + "&language=en-US")
    const data = await rawData.json()
    return data
}   