# Weather App

A weather app that returns the weather of a city specified by the user

## Getting Started
These instructions will tell you how to download, run and use this project:

### Installing

```
git clone https://github.com/david1707/weather-app
npm i yargs --save
npm i axios --save
```

Modify the config.js with your API keys, then:
```
node app.js --help
```

### Examples

To use it, you have to run the app.js file, then specify the options:
--ci CITY [Your city or town]
--la LANGUAGE [The first 2 characters of the language you want. 'fr' for french, 'ca' for catalan, and so on (optional: English by default)]

```
node .\app.js --ci Valencia
```
Returns the weather in València:

The weather prevision for Valencia is:<br>
            Temperature: 25.05º<br>
            Apparent Temperature: 25.76º<br>
            Rain probability: 0%<br>
            Humidity: 83%<br>
            Wind Speed: 1.93km/h<br>
            Sky: Partly Cloudy<br>

```
node .\app.js --ci California -la es
```
Returns the weather in California in spanish:

La previsión del tiempo en California es de:<br>
            Temperatura: 38.24º<br>
            Sensación Térmica: 38.24º<br>
            Probabilidad de lluvia: 0%<br>
            Humedad: 22%<br>
            Velocidad del viento: 2.04km/h<br>
            Cielo: Despejado<br>


(More options coming in the future)


## Translations

Right now only english, catalan and spanish languages are available. If you want to add a language, make a request.
Languages available are here (https://darksky.net/dev/docs#/dev/docs)


## Built With

* [Node.JS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Yargs](http://yargs.js.org/) - Option parser
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js

## Authors

* **David Membrives** - *Initial work* - [david1707](https://github.com/david1707)


## License

This project is licensed under the ISC License
