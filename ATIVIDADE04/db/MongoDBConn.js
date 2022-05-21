const mongoose = require('mongoose');
const localhost = 'mongodb://127.0.0.1:27017/'

var mongoDB_URI = localhost +'crud';
mongoose.connect(mongoDB_URI, { useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected",()=>{
    console.log("Mongoose Connected to"+mongoDB_URI);
});
db.on("disconnected",()=>{
    console.log("Mongoose Connected to"+mongoDB_URI);
});
db.on('error', (err) => {
    console.log('Mongoose Error: ' + err);
});