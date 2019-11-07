

let https = require('https');
const bbCore = require('sdk');

exports.shorten = (data, callback) => {

    // the url to shorten
    const url = data.url;

    // get the token from config
    const access_token = bbCore.getConfigValue('access_token');

    const options = {
        host: 'api-ssl.bitly.com', port: 443,
        path: "/v3/shorten?access_token=" + access_token + "&longUrl=" + encodeURIComponent(url),
        method: 'GET'
    };
    const req = https.request(options, (res) => {
        res.on('data', (d) => {
            let body = d.toString()
            body = JSON.parse(body);
            // did we get a successful result from bitly?
            if (body && body.data && body.data.url) {
                callback(null, {result: body.data.url});
            } else {
                callback(null, {result: url})
            }
        });
    });

    req.on('error', (e) => {
        // error use the fallback
        console.error(e);
        callback(null, {fallback: true});
    });
    req.end();

};

