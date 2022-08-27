require('dotenv/config')
const express = require('express');
const app = express();
const cors = require('cors');
const error = require('./middlewares/error')

app.use(express.json())
app.use(cors())
app.use(error)
app.use(express.urlencoded({ extended: true }))


global.__basedir = __dirname;

require('./middlewares/route')(app);

app.use('/api/media/img/', express.static('media/img'));


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})