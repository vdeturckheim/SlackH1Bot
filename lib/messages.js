'use strict';

module.exports.thanksForReporting = function (username) {

    return `Hello${username ? ' ' + username : ''},
Thanks for reporting this to us. Someone will quickly look at this report and triage it.`
};
