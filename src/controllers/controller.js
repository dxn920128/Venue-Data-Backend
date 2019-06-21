const userModel = require("./.././models/userSchema");
const jwt = require('jsonwebtoken');
const jwtsecret = "mysecretkey";
const venue = require("./.././models/venueSchema");
const company = require("./.././models/managementCompany");

module.exports = {
    newUser: async (ctx) => {
        try {
            ctx.body = await userModel.User.create(ctx.request.query);
            console.log()
        } catch (err) {
            ctx.status = 400;
            ctx.body = err.errmsg;
        }

    },
    login: async (ctx, next) => {
        await userModel.passport.authenticate('local', function (err, user) {
            if (!user) {
                ctx.body = "Login failed";
            } else {
                //--payload - info to put in the JWT
                const payload = {
                    email: user.email
                };
                console.log(payload);
                const token = jwt.sign(payload, jwtsecret, {expiresIn: 60 * 60}); //JWT is created here
                ctx.body = {token: "JWT " + token};
            }
        })(ctx, next);
    },
    deleteVenue: async (ctx) => {
        try {
            const result = await venue.findOneAndRemove({_id: ctx.request.query._id});

            if(!result){
                ctx.body = "Can not delete venue";
                ctx.status = 400;
            } else {
                ctx.body = "Venue successfully deleted";
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    },
    addNewVenue: async (ctx) => {
        try {
            const result = await venue.create(ctx.request.query);

            if(!result) {
                ctx.body = "Venue could not be created";
                ctx.status = 400;
            }
            else{
                ctx.body = "Venue successfully created \n" + result;
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    },
    readVenue: async (ctx) => {
        try {
            const result = await venue.findOne({_id: ctx.request.query._id});

            if (!result) {
                ctx.body = "Venue can not be found";
                ctx.status = 400;
            } else {
                ctx.body = result;
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    },
    updateVenue: async (ctx) => {
        try {
            /**************** FIX THIS METHOD *************/
            const newData = ctx.request.query.newData;
            const result = await venue.findOneAndUpdate({_id: ctx.request.query._id}, {$set: {city : "Tirana"}, new: true});

            console.log(result);

            if (!result) {
                console.log("Can't be found");
                ctx.body = "Venue can not be found";
                ctx.status = 400;
            } else {
                console.log("Updated");
                ctx.body = "Venue successfully updated";
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    },
    addNewCompany: async(ctx) => {
        try {
            const result = await company.create(ctx.request.query);

            if(!result) {
                ctx.body = "Company could not be created";
                ctx.status = 400;
            }
            else{
                ctx.body = "Company successfully created\n" + result;
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    },
    updateCompany: async (ctx) => {
        try {
            const newData = ctx.request.query.newData;
            const result = await company.findOneAndUpdate({_id: ctx.request.query._id}, {$set: {city : "Tirana"}, new: true});

            console.log(result);

            if (!result) {
                console.log("Cant be found");
                ctx.body = "Company can not be found";
                ctx.status = 400;
            } else {
                console.log("Updated");
                ctx.body = "Company successfully updated";
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    },
    readCompany: async (ctx) => {
        try {
            const result = await company.findOne({_id: ctx.request.query._id});

            if (!result) {
                ctx.body = "Company can not be found";
                ctx.status = 400;
            } else {
                ctx.body = result;
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    },
    deleteCompany: async (ctx) => {
        try {
            const result = await company.findOneAndRemove({_id: ctx.request.query._id});

            if(!result){
                ctx.body = "Can not find company";
                ctx.status = 400;
            } else {
                ctx.body = "Company successfully deleted";
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    }
};