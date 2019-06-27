const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    venueName: {
        type: String,
        required: 'name is required'
    },
    country: String,
    city: String,
    managingCompany : {type : mongoose.Schema.Types.ObjectId, ref : 'managementCompany'},
    address: String,
    coordinates: String,
    gla: Number,
    openingYear : Number,
    googleMapsStatus : Boolean,
    appleMapsStatus : Boolean,
    linkedin : String,
    facebook : String,
    twitter : String,
    instagram : String,
    androidApp : String,
    iosApp : String,
    website : String,
    yandex : String,
    foursquare : String,
    yelp : String,
    googleMyBusiness : String,
    tripAdvisor : String,
    moovit : String,
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