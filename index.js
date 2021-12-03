const express = require('express')
const path = require('path');
const app = express()

const port = process.env.PORT || 3000
const envTest = process.env.TEST || "not"


app.get('/', (req, res) => {
    res.send('Hello World! env is: ' + envTest)
})

app.get('/movie', (req, res) => {
    res.sendFile(path.resolve('pages/index.html'))
    //res.send("id: " + req.query.id)
})  

app.listen(port, () => {
    console.log("Example app listening at http://localhost:" + port)
})