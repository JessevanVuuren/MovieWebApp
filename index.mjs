import { readFileSync } from "fs"
import {} from 'dotenv/config'
import fetch from 'node-fetch'
import { resolve } from 'path'
import express from 'express'

const app = express()

const port = process.env.PORT || 3000
const API = process.env.KEY



const getHTMLfile = () => {
    const css = readFileSync(resolve("pages/style.css"), "utf8")
    let HTMLpage = readFileSync(resolve('pages/index.html'), 'utf8')
    HTMLpage = HTMLpage.replace("{{style}}", "<style>" + css + "</style>")
    return HTMLpage;
}

let htmlPage = getHTMLfile()


app.get('/movie', async(req, res) => {

    const movieID = req.query.id;
    if (!movieID) return res.redirect('/');
    const data = await getImgUrl(movieID)

    console.log("movie: " + data["title"])

    return res.send(await replacePage(htmlPage, data));
})


app.get('/', (req, res) => res.send('Hello World!')) // home page
app.get('/.well-known/assetlinks.json', (req, res) => res.sendFile(resolve('assetlinks.json'))) // android deep linking
app.get('/.well-known/apple-app-site-association', (req, res) => res.sendFile(resolve('apple-app-site-association'))) // ios deep linking



app.listen(port, () => {
    console.log("Example app listening at http://localhost:" + port)
})


const replacePage = async (htmlPage, data) => {
    return htmlPage
        .replace(/{{movieName}}/g, data["title"])
        .replace(/{{movieDescription}}/g, data["overview"])
        .replace(/{{posterPathW500}}/g, "https://image.tmdb.org/t/p/w500" + data["poster_path"])
        .replace(/{{posterPathW185}}/g, "https://image.tmdb.org/t/p/w185" + data["poster_path"])
        .replace(/{{backDropW500}}/g, "https://image.tmdb.org/t/p/original" + data["backdrop_path"])
}

const getImgUrl = async(movieID) => {
    const rawData = await fetch("https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + API + "&language=en-US")
    const data = await rawData.json()
    return data
}