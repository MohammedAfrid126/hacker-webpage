// Impporting the required modules
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
//Use the below url to conneect to Mongo
//use 127.0.0.1:27017 instead of localhost to connect to mongo
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');


const port = 8000; // Assigning port

//Creating Schema

const contactDance = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    description: String
    });

    const Contact = mongoose.model('ContactDataBase', contactDance);


// Express related Stuff
app.use('/static', express.static(path.join(__dirname, 'static'))); // for serving the static files
app.use(express.urlencoded());

//Pug related stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); //set views directory

// end point related stuff
app.get('/',(req,res)=>{
    params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact',(req,res)=>{
    params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.status(200).send("The contact has been saved")
    }).catch(()=>{
        res.status(400).send("Something went wrong")
    });
});


// start the Server

app.listen(port,()=>{
    console.log("The server is listening at "+port);
});