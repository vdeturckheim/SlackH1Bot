'use strict';
const HTTP = require('http');
const SlackClient = require('@slack/client');
const IsEmail = require('isemail');

const HackerOne = require('./lib/hackerone');
const Messages = require('./lib/messages');
const Email = require('./lib/email');

const rtm = new SlackClient.RTMClient(require('./secret.js').slack_token);
rtm.start();

const handleEvent = function (event) {

    if (event.username !== 'HackerOne') {
        return Promise.resolve(); // let's ignore other messages
    }
    const fallback = event.attachments[0].fallback;

    if (fallback.startsWith('New HackerOne report')) {
        // we are in the case of a new report
        const reportId = fallback.match(/#(\d+)/)[1];
        console.log('new report', reportId);
        return HackerOne.writeComment(reportId, Messages.thanksForReporting(), false);
    }
    if (fallback.startsWith('New HackerOne comment')) {
        // we are in the case of a new comment
        // TODO: you have to make sure the comment is private to prevent people from exploiting this and spam
        const text = event.attachments[0].text;
        if (text.startsWith('/notify_maintainer')) {
            // this is an instruction to the bot to notify the user whose email has been given and offer them to join
            console.log('notifying maintainer');
            let email;
            try {
                email = text.split(' ')
                    .find((x) => x.includes('mailto'))
                    .split('|')[1].split('>')[0];
            }
            catch (e) {
                return Promise.reject(new Error('could not find email'), event); // TODO: err message
            }

            if (!email || !IsEmail.validate(email)) {
                return Promise.reject(new Error('could not find email'), event); // TODO: err message
            }
            const msg = Messages.NotifyMaintainer();
            return Email.send(email, msg.topic, msg.value);
        }
    }
};

rtm.on('message', (event) => {

    handleEvent(event)
        .catch((err) => {

            console.error(event);
            console.error(err);
        });
});

HTTP.createServer((req, res) => {

    res.end();
})
    .listen(process.env.PORT || 8080); // let's make heroku happy
