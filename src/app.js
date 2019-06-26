//Importing required modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require ('./utils/forecast.js')

//Create Express application
const app = express();

const port = process.env.PORT || 3000;

//Define paths for Express configuration
const pathToPublicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars template engine and views/partials location
app.set('view engine', hbs);
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory for public view
app.use(express.static(pathToPublicDir));

//GET route for different pages
app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather App',
        name: 'Udbhav'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About',
        name: 'Udbhav'
    });
});

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title: 'Help page',
        name: 'Udbhav',
        message: 'This is the help page'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ //We add the return statement here so that the function stops executing if the address query string is not provided
            error: 'Address must be provided.'
        });
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => { //We add a default value of object here so that the function does not try and destructure (undefined)
        if (error) {
            return res.send({error: error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error});
            }
                
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        })
    });
});

app.get("/help/*", (req, res) => {
    res.render('404.hbs', {
        title: 404,
        errorMessage: 'Help article not found',
        name: 'Udbhav'
    });
});

app.get("*", (req, res) => {
    res.render('404.hbs', {
        title: 404,
        errorMessage: 'Page not found',
        name: 'Udbhav'
    });
});

//To make the server live
app.listen(port, () => {
    console.log('Server is up and running on ' + port);
})