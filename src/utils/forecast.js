//Importing required modules
const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/f51d7b274391d9231044409ad56b4401/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees and there is ${body.currently.precipProbability}% chance of rain. The temperature range for today is between ${body.daily.data[0].temperatureLow} degrees and ${body.daily.data[0].temperatureHigh} degrees.`);
        }
    })
};

//To allow the forecast function to be used in the src/app.js file
module.exports = forecast;