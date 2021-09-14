require('dotenv').config();

const {
    TELEGRAF_TOKEN,
    GMAIL_USER,
    GMAIL_PASSWORD
} = process.env;

module.exports = {
    TELEGRAF_TOKEN,
    GMAIL_USER,
    GMAIL_PASSWORD
};