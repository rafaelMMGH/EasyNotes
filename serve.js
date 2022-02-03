const express = require('express');

//config DB
const dbConfig = require('./config/database.config')

const port = 8080;
const host = "localhost";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({'msg': 'Hello World'});
});

// Require Notes routes
require('./app/routes/note.routes')(app)

app.listen(port, () =>{
    console.log(`Server is running at: http://${host}:${port} `);
});