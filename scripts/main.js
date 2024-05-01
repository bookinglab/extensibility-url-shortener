

let https = require('https');
const bbCore = require('sdk');
const axios = require('axios');

exports.shorten = (data, callback) => {

    // the url to shorten
    const url = data.url;

    if (url.indexOf('staging') !== -1 || url.indexOf('trainme') !== -1) {
        console.log(`URL ${url} to be shortened`);
        // get the token from config
        const axios = require('axios');
        let body = JSON.stringify({
            "target": `${url}`
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://yabj7v6gwj7t3ukobis7fiwfsu0ekqiw.lambda-url.eu-west-1.on.aws/',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : body
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response && response.data && response.data.link) {
                // callback(null, {result: `https://trainme.freestyle.abbott/${response.data.link}`});
                callback(null, {result: `https://staging.bookinglab.co.uk/abbott-diabetes-care/${response.data.link}`});
            } else {
                callback(null, {result: url});
            }
        })
        .catch((error) => {
            console.log(error);
            callback(null, {result: url});
        });
    }
    else {
        console.log(`URL ${url} does not match criteria for shortening`);
        callback(null, {result: url});
    }

};

