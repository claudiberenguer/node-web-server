const request = require('request');

const forecast = ({lat, lon}, callback) => {
    const url = 'https://api.darksky.net/forecast/f021737fe8329299ff5d568507c3d8ab/' + lat + ',' + lon +'?lang=ca&units=si';
    request({url, json : true}, (error,{body}) => {
        if (error) {
           callback('error thrown by request module', undefined);
        }
        else if (body.code == 400) {
            callback(body.error, undefined);
        }
        else {
            callback(undefined, body.currently.summary + '. La temperatura és de ' + body.currently.temperature + 'ºC \
            i la probabilitat de pluja és del ' + body.currently.precipProbability + '%.');
        }
    });
}

module.exports = forecast;