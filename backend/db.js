// The code which is used to connect with the database
// Connecting to mongoDB

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB successfully");
});

module.exports=db