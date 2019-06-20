const mongoose = require('mongoose');

const ManagementCompany = new mongoose.Schema({
    name: {
        type: String,
        required: 'name is required',
        unique: 'should be unique'
    },
    hqCountry: String,
    hqCity: String,
    hqAddress: String,
    totalGLA: String,
    numberOfVenues: String,
    linkedIn : String,
    facebook : String,
    twitter : String,
    instagram : String,
    website : String,
}, {
    timestamps: true
});

const managementCompany = mongoose.model('managementCompany', ManagementCompany);

module.exports = managementCompany;