
(() => {
    'use strict';

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    const Location = require('./location.schema');

    let DriverSchema = new Schema({
        name: { type: 'String', required: true },
        currentLocation: Location,
        isLateDeliverer: {type: 'Boolean', required: true, default: false }
    }, { strict: true, timestamps: true });
    
    // specify the transform schema option
    if (!DriverSchema.options.toObject) DriverSchema.options.toObject = {};
    DriverSchema.options.toObject.transform = function (doc, returnObject) {
        // remove sensitive-ish information
        delete returnObject.createdAt;
        delete returnObject.updatedAt;
        delete returnObject.__v;
        return returnObject;
    };

    module.exports =  mongoose.model('Driver', DriverSchema);

})();
