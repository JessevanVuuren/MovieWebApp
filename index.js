const express = require('express')
const path = require('path')
const fs = require("fs")
const app = express()

const port = process.env.PORT || 3000
const envTest = process.env.TEST || "not"


app.get('/', (req, res) => {
    res.send('Hello World! env is: ' + envTest)
})


app.get('/movie', (req, res) => {
    fs.readFile(path.resolve('pages/index.html'), 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        // get post info
        const postId = req.query.id;
        if (!postId) return res.redirect('/');

        //inject meta tags
        htmlData = htmlData
            .replace("<title>Movie Recommender</title>", "<title>titleText: " + postId + "</title>")
            // .replace('__META_OG_TITLE__', post.title)
            // .replace('__META_OG_DESCRIPTION__', post.description)
            // .replace('__META_DESCRIPTION__', post.description)
            // .replace('__META_OG_IMAGE__', post.thumbnail)

        return res.send(htmlData);
    });
})


app.listen(port, () => {
    console.log("Example app listening at http://localhost:" + port)
})

