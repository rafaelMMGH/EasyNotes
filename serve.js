const express = require('express');

const app = express();

app.use(express.json());

//config DB
const dbConfig = require('./config/database.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

//Connecting to the DB
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database")
}).catch( err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})


app.get('/', (req, res) => {
    res.json({'msg': 'Hello World'});
});

// Require Notes routes
require('./app/routes/note.routes')(app)

app.listen(8080, () =>{
    console.log("Server is running");
})