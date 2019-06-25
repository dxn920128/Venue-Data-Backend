const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name is required'
    },
    country: String,
    city: String,
    managementCompany : {type : mongoose.Schema.Types.ObjectId, ref : 'managementCompany'},
    address: String,
    coordinates: String,
    GLA: String,
    openingYear : Number,
    googleMapsStatus : Boolean,
    appleMapsStatus : Boolean,
    linkedIn : String,
    facebook : String,
    twitter : String,
    instagram : String,
    androidApp : String,
    iOSApp : String,
    website : String,
    yandexLink : String,
    foursquareLink : String,
    yelpLink : String,
    googleMyBusinessLink : String,
    tripAdvisorLink : String,
    moovitAppLink : String,
    zomatoLink : String,
    airbnbLink : String,
    isOurCustomer : [
        {
            venuex : Boolean,
            web : Boolean,
            mobile : Boolean,
            kiosk : Boolean,
            ds : Boolean,
            crm : Boolean,
            fm : Boolean
        }
    ]
}, {
    timestamps: true
});

const venue = mongoose.model('venue', venueSchema);

module.exports = venue;