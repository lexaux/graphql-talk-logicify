const fetch = require('node-fetch');

const YAHOO_API = "https://query.yahooapis.com/v1/public/yql?format=json&q=";
const getWeatherForCity = (city) => {
    const query = encodeURIComponent(`select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where  text="${city}") and u ='c'`)

    return fetch(YAHOO_API + query)
        .then(res => res.json())
        // .then(json => console.log(JSON.stringify(json, null, 4)));
        .then(weatherJson => `${weatherJson.query.results.channel.item.condition.text}, ${weatherJson.query.results.channel.item.condition.temp}˚C`)
};

module.exports.getWeatherForCity = getWeatherForCity;