//Importing required modules
const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidWRiaGF2IiwiYSI6ImNqeDIxMml4aDBmbXU0YW9mMjBxMGNoeDcifQ.lQJC4J4e0Ka7ZUfAdsrXew&limit=1`;

    request({url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to geocoding service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

//To allow the geocode function to be used in the src/app.js file
module.exports = geocode;