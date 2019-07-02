const mongoose = require('mongoose');

const ManagingCompany = new mongoose.Schema({
    companyName: String,
    hqCountry: String,
    hqCity: String,
    hqAddress: String,
    totalGLA: String,
    numberOfVenues: Number,
    linkedin : String,
    numberOfCountries: String,
    facebook : String,
    twitter : String,
    instagram : String,
    youtube : String,
    website : String,
}, {
    timestamps: true
});

const managingCompany = mongoose.model('managingCompany', ManagingCompany);

module.exports = managingCompany;