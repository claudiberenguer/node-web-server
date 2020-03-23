const request = require('request');

const geocode = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(place) + '.json?limit=1&language=ca&access_token=pk.eyJ1IjoiY2JlcmVuZ3VlcjIiLCJhIjoiY2s3cDNla3FtMDNhaTNyanlvb2Y1ZHV3cSJ9.Lu_7TtIFyi2iTPNCHB1PjA';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Cannot connect to the server', undefined);
        } else if (body.features.length === 0) {
            callback('Cannot find a coordinate for this place name', undefined);
        }
        else {
            return_value = {
                place_name : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            };
            callback(undefined, return_value);
            return return_value;
        }
    });
}

module.exports = geocode;