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
    GLA: Number,
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
    yandex : String,
    foursquare : String,
    yelpLink : String,
    googleMyBusiness : String,
    tripAdvisor : String,
    moovitApp : String,
    zomato : String,
    airbnb : String,
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