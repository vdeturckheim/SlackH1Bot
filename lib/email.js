'use strict';
const mailjet = require('node-mailjet')
    .connect(require('../secret.js').mailjet_public, require('../secret.js').mailjet_private);

module.exports.send = function (email, topic, content) {

    return mailjet
        .post('send', { version: 'v3.1' })
        .request({
            'Messages': [
                {
                    From: {
                        Email: 'vlad2t@hotmail.com',
                        Name: 'Node.js Security Working Group'
                    },
                    To: [
                        {
                            Email: email
                        },
                        {
                            Email: 'vlad2t@hotmail.com' // Let me get a copy for debugg
                        }
                    ],
                    Subject: topic,
                    TextPart: content
                }
            ]
        });
};
