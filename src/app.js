const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./geocode');
const forecast = require('./forecast');

const app = express();

// Set paths for express and hbs config
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// Set attributes for view engine, for views directory and partials
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

// Set the directory used for static content
app.use(express.static(publicDir));
app.use(express.json());


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Claudi Berenguer'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Claudi Berenguer'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Claudi Berenguer'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404-error', {
        error: "The page does not exist",
        title: "404 Error",
        name: "Claudi Berenguer"
    })
});

// app.get('', (req, res) => {
//     res.send('Hellow Express!')
// });

// app.get('/help', (req, res) => {
//     res.send('help page')
// });

// app.get('/about', (req, res) => {
//     res.send('<H1>About</H1>')
// });

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'Error: An address must be passed',
            forecastData: undefined
        });
    }
    geocode(req.query.address, (error, {latitude: lat, longitude: lon, place_name} = {}) => {
    //geocode(req.query.address, (error, location) => {
        if (error) {
            return res.send({
                error,
                forecastData: undefined
            });
        }
        //const {latitude: lat, longitude: lon, place_name} = location;
        forecast({lat, lon}, (error, data) => {
            if (error) {
                return res.send({
                    error,
                    forecastData: undefined
                });
            }
            res.send( {
                error: undefined,
                forecastData : {
                    location: place_name,
                    forecast: data 
                }
            });                      
        });
    });
});

app.get('*', (req, res) => {
    res.render('404-error', {
        error: "The page does not exist",
        title: "404 Error",
        name: "Claudi Berenguer"
    })
});

app.listen(3000, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('Server is up and running');
});