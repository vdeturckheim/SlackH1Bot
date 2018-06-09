let Secret = {};
try {
    Secret = require('./secret.json');
}
catch (e) {}

module.exports = {
    slack_token: Secret.slack_token || process.env.SLACK_TOKEN,
    hackerone_token: Secret.hackerone_token || process.env.HACKERONE_TOKEN,
    hackerone_user: Secret.hackerone_user || process.env.HACKERONE_USER,
    mailjet_public: Secret.mailjet_public || process.env.MAILJET_PUBLIC,
    mailjet_private: Secret.mailjet_private || process.env.MAILJET_PRIVATE,
};
