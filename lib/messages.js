'use strict';

module.exports.thanksForReporting = function (username) {

    return `Hello${username ? ' ' + username : ''},
Thanks for reporting this to us. Someone will quickly look at this report and triage it.`
};

module.exports.NotifyMaintainer = function (packageName) {

    return {
        topic: `reported vulnerability in ${packageName || 'a package you maintain'}`,
        value: `Hello there, 
I am the Node.js Security Working group (https://github.com/vdeturckheim/security-wg) bot.
Someone reported a vulnerability in a package you maintain. So, I'd like to add you to the report on the HackerOne platform.
You can find more details about our process on our Github repository https://github.com/vdeturckheim/security-wg/blob/master/processes/third_party_vuln_process.md

You should receive an invite to HackerOne soon (or you might already have received it). Pleas check you spam folder to find such email.

If you have any questions, feel free to join us on our public Slack and to ask for a member of the WG:
https://nodejs-security-wg.herokuapp.com/

Thanks a lot!

PS, you can also answer to this email, this goes to Vladimir's private inbox and since this bot is still in beta, he would be more than happy to get some feedback.`
    }
};

