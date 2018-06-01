'use strict';
const Fs = require('fs');
const SlackClient = require('@slack/client');
// SNIP: the initialization code shown above is skipped for brevity

const rtm = new SlackClient.RTMClient(require('./secret').slack_token);
rtm.start();

let i = 0;
rtm.on('message', (event) => {

});
