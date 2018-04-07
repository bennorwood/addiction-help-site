
(() => {
    'use strict';

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    /**
     * We do not want to create a schema for location since its being treated as a sub-document
     */
    let LocationSchema = new Schema({
        latitude: { type: 'Number', required: true},
        longitude: { type: 'Number', required: true }
    }, {strict: true});

    module.exports = LocationSchema;

})();
