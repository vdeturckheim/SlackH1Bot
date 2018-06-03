'use strict';
const SlackClient = require('@slack/client');

const HackerOne = require('./lib/hackerone');
const Messages = require('./lib/messages');
const Email = require('./lib/email');

const rtm = new SlackClient.RTMClient(require('./secret').slack_token);
rtm.start();

rtm.on('message', (event) => {

    try {
        if (event.username !== 'HackerOne') {
            return; // let's ignore other messages
        }
        const fallback = event.attachments[0].fallback;

        if (fallback.startsWith('New HackerOne report')) {
            // we are in the case of a new report
            const reportId = fallback.match(/#(\d+)/);
            HackerOne.writeComment(reportId, Messages.thanksForReporting(), false);
        }
        if (fallback.startsWith('New HackerOne comment')) {
            // we are in the case of a new comment
            const text = event.attachments[0].text;
            if (text.startsWith('/notify_maintainer')) {
                // this is an instruction to the bot to notify the user whose email has been given and offer them to join

            }
        }
    }
    catch (e) {
        console.error(e);
    }

});
