const { googleApiKey, forecastApiKey } = require('./config');

const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
    ci: {
        demand: true,
        alias: 'city',
        describe: 'The city you want to get weather info',
        string: true
    },
    la: {
        demand: false,
        alias: 'language',
        describe: "Select the language info output by writing the first 2 characters of your language ('en' for 'english', 'ca' for 'catalan'...) (optional)",
        string: true
    }
    
})
.help()
.alias('help', 'h')
.argv;

// If the user specifies a language, append it to the Weather API url
var { city, la } = argv;
if (la) { la = `&lang=${la}`} else la = '';
 
geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleApiKey}`;


axios
    // Gets the lat-long values and points to the Weather API if everything is OK
    .get(geocodeUrl).then((response) => {
        
        if (response.data.status === 'OK'){
            const lat = response.data.results[0].geometry.location.lat;
            const lng = response.data.results[0].geometry.location.lng;
            var weatherUrl = `https://api.forecast.io/forecast/${forecastApiKey}/${lat},${lng}?units=si${la}`
            return axios.get(weatherUrl);
        } else if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that city. Are you sure there is no typo?');
        }   

    })
    .then((res) => {
        const summary = res.data.currently.summary;
        const precipProbability = res.data.currently.precipProbability * 100;
        const temperature = res.data.currently.temperature;
        const apparentTemperature = res.data.currently.apparentTemperature;
        const humidity = res.data.currently.humidity * 100;
        const windSpeed = res.data.currently.windSpeed;
        if (argv.la === 'ca') {
            console.log(`La previsió de l'oratge a ${city} és de:
            Temperatura: ${temperature}º
            Sensació Tèrmica: ${apparentTemperature}º
            Probabilitat de pluja: ${precipProbability}%
            Humitat: ${humidity}%
            Velocitat del vent: ${windSpeed}km/h
            Cel: ${summary}`)
        } else if (argv.la === 'es'){
            console.log(`La previsión del tiempo en ${city} es de:
            Temperatura: ${temperature}º
            Sensación Térmica: ${apparentTemperature}º
            Probabilidad de lluvia: ${precipProbability}%
            Humedad: ${humidity}%
            Velocidad del viento: ${windSpeed}km/h
            Cielo: ${summary}`)
        } else {
            console.log(`The weather prevision for ${city} is:
            Temperature: ${temperature}º
            Apparent Temperature: ${apparentTemperature}º
            Rain probability: ${precipProbability}%
            Humidity: ${humidity}%
            Wind Speed: ${windSpeed}km/h
            Sky: ${summary}`)
        }
    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to the API server.');
        } else {
            console.log(e.message);
        }
    })