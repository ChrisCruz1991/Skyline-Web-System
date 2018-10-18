const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello from express')
})

app.get('/test', (req, res) => {
    res.send('This is the testing page')
})

app.listen(3000, () => {
    console.log('Server listening on port 3000...')
})