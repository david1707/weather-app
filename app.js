const { googleApiKey } = require('./config');

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

var { city, la } = argv;
if (la) la = `&lang=${la}`;

 
geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleApiKey}`;


axios
    // Gets the lat-long values and points to the Weather API if everything is OK
    .get(geocodeUrl).then((response) => {
        
        if (response.data.status === 'OK'){
            const lat = response.data.results[0].geometry.location.lat;
            const lng = response.data.results[0].geometry.location.lng;
            var weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}?units=si${la}`;;
            return axios.get(weatherUrl);
        } else if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that city. Are you sure there is no typo?');
        }   

    })
    .then((res) => {
        const summary = res.data.currently.summary;
        const precipProbability = res.data.currently.precipProbability;
        const temperature = res.data.currently.temperature;
        const apparentTemperature = res.data.currently.apparentTemperature;
        const humidity = res.data.currently.humidity;
        const windSpeed = res.data.currently.windSpeed;
        console.log(summary);
    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to the API server.');
        } else {
            console.log(e.message);
        }
    })