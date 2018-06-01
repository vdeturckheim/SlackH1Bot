'use strict';
const SlackClient = require('@slack/client');
// SNIP: the initialization code shown above is skipped for brevity

const rtm = new SlackClient.RTMClient(process.env.SLACK_TOKEN);


rtm.on('message', (event) => {
    // For structure of `event`, see https://api.slack.com/events/message

    // Skip messages that are from a bot or my own user ID
    if ( (message.subtype && message.subtype === 'bot_message') ||
        (!message.subtype && message.user === rtm.activeUserId) ) {
        return;
    }

    // Log the message
    console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
});
