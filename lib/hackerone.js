'use strict';
const TOKEN = require('../secret.js').hackerone_token;
const USER = require('../secret.js').hackerone_user;

const Wreck = require('wreck');

const Wait = require('./wait');

module.exports.writeComment = async function (reportId, message, internal = true) {

    await Wait.for(5000);
    const payload = {
        data: {
            type: 'activity-comment',
            attributes: { message, internal }
        }
    };
    const auth = Buffer.from(`${USER}:${TOKEN}`).toString('base64');
    const headers = { Authorization: `Basic ${auth}` };
    console.log('POST', `https://api.hackerone.com/v1/reports/${reportId}/activities`);
    return Wreck.post(`https://api.hackerone.com/v1/reports/${reportId}/activities`, { payload, headers });
};


