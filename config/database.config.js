const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/easy-notes'

mongoose.Promise = global.Promise;

//Connecting to the DB
const dbConnection = mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database")
}).catch( err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

module.exports = {
    dbConnection 
}