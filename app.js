const express = require('express')

const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/'), (req, res) => {
    res.send('Hello world!')
}

app.listen(3000)

console.log('Server running at http://127.0.0.1:3000/');