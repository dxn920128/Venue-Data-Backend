const venueTypeDictionary = { 
    'Airport' : "airport" ,
    'International Airport' : "airport.intl",
    'Aquarium' : "aquarium",
    'Business Campus' : "businesscampus",
    'Casino' : "casino",
    'Community Center' : "communitycenter",
    'Convention Center' : "conventioncenter",
    'Government Facility' : "governmentfacility",
    'Health Care Facility' : "healthcarefacility",
    'Hotel' : "hotel",
    'Museum' : "museum",
    'Parking Facility' : "parking facility",
    'Resort' : "resort",
    'Retail Store' : "retailstore",
    'Shopping Center' : "shoppingcenter",
    'Stadium' : "stadium",
    'Stripmail' : "stripmail",
    'Theater' : "theater",
    'Train station' : "trainstation",
    'Transit station' : "transitstation",
    'University' : "university",
}

exports.toBackEnd = function (s) {
    return venueTypeDictionary[s];
}

exports.toFrontEnd = function(value) {
    return Object.keys(venueTypeDictionary).find(key => venueTypeDictionary[key] === value);
  }