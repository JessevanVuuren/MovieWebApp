const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const envTest = process.env.TEST || "not"


app.get('/', (req, res) => {
    res.send('Hello World! env is: ' + envTest)
})

app.listen(port, () => {
    console.log("Example app listening at http://localhost:" + port)
})