
(() => {
    'use strict';

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    const LocationSchema = require('./location.schema');

    let DeliverySchema = new Schema({
        deliverBy: { type: 'Date', required: true},
        pickupLocation: LocationSchema,
        dropoffLocation: LocationSchema,
        securedBy: { type: Schema.ObjectId, required: false, default: null},
        expectedPickupTime: {type: 'Date', required: false, default: null}
    }, { strict: true, timestamps: true });
    
    // specify the transform schema option
    if (!DeliverySchema.options.toObject) DeliverySchema.options.toObject = {};
    DeliverySchema.options.toObject.transform = function (doc, returnObject) {
        // remove sensitive-ish information
        delete returnObject.createdAt;
        delete returnObject.updatedAt;
        delete returnObject.__v;
        return returnObject;
    };

    module.exports =  mongoose.model('Delivery', DeliverySchema);

})();
