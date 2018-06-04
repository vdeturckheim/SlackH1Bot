'use strict';

module.exports.for = function (delay) {

    return new Promise((resolve) => {

        setTimeout(() => resolve(), delay);
    });
};
