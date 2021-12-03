import express from 'express'
import { resolve } from 'path'
import { readFile } from "fs"
import fetch from 'node-fetch';
const app = express()

const port = process.env.PORT || 3000
const envTest = process.env.TEST || "not"
const API = process.env.KEY



app.get('/', (req, res) => {
    res.send('Hello World! env is: ' + envTest)
})


app.get('/movie', (req, res) => {
    readFile(resolve('pages/index.html'), 'utf8', async (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }


        // get id
        const movieID = req.query.id;
        if (!movieID) return res.redirect('/');

        const data = await getImgUrl(movieID)
        


        htmlData = htmlData
            .replace(/{{movieName}}/g, data["title"])
            .replace(/{{posterPathW500}}/g, "https://image.tmdb.org/t/p/w500" + data["poster_path"])
            .replace(/{{posterPathW95}}/g, "https://image.tmdb.org/t/p/w95" + data["poster_path"])
            .replace(/{{movieDescription}}/g, data["overview"])


        return res.send(htmlData);
    });
})


app.listen(port, () => {
    console.log("Example app listening at http://localhost:" + port)
})

const getImgUrl = async (movieID) => {
    const rawData = await fetch("https://api.themoviedb.org/3/movie/" + API + "?api_key=648d096ec16e3f691572593e44644d30&language=en-US")
    const data = await rawData.json()
    return data
}   