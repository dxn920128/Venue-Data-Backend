const mongoose = require('mongoose');

const ManagingCompany = new mongoose.Schema({
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

const managingCompany = mongoose.model('managingCompany', ManagingCompany);

module.exports = managingCompany;