'use strict';

const logger = require('./logger');
const chalk = require('chalk');
const fs = require('fs');

function randomTimeout(lower, upper) {
    return Math.random() * (upper - lower) + lower;
}

function delay(fn, [lower, upper]) {
    var time = randomTimeout(lower, upper);

    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(fn.call());
        }, time);
    });
}

function logErrors(reason) {
    if (reason instanceof Error) {
        logger.error('Error in code')
        logger.error(reason);
        return;
    }

    logger.error('Request failed')
    logger.error('Error reason', reason.error);

    fs.writeFileSync('./error.log', JSON.stringify(reason));

    logger.info('Wrote response in error.log');
}

function logRequest(url, options) {
    logger.info('%s %s', chalk.inverse(options.method || 'GET'), url);
}

module.exports = {
    randomTimeout,
    delay,
    logErrors,
    logRequest,
};