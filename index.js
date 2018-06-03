'use strict';
const Fs = require('fs');
const SlackClient = require('@slack/client');
// SNIP: the initialization code shown above is skipped for brevity

const rtm = new SlackClient.RTMClient(require('./secret').slack_token);
rtm.start();

rtm.on('message', (event) => {

    console.log(JSON.stringify(event));
});
