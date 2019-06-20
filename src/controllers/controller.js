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
                ctx.body = {user: user.email, token: 'JWT ' + token};
            }
        })(ctx, next);
    },
    deleteVenue: async (ctx) => {
        try {
            const result = await venue.findOneAndRemove({name: ctx.request.query.name});

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
    addNewVenue: async (ctx, next) => {
        try {
            const result = await venue.create(ctx.request.query);
            const saved = await result.save();

            if(!saved) {
                ctx.body = "Venue could not be saved to database";
                ctx.status = 400;
            }
            if(!result) {
                ctx.body = "Venue could not be created";
                ctx.status = 400;
            }
            else{
                ctx.body = "Venue successfully created";
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    },
    showVenue: async (ctx, next) => {
        try {
            const result = await venue.findOne({name: ctx.request.query.name});

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
            const newData = ctx.request.query.newData;
            const result = await venue.findOneAndUpdate({name: ctx.request.query.name}, {$set: {city : "Tirana"}, new: true});

            console.log(result);

            if (!result) {
                console.log("cant be found");
                ctx.body = "Venue can not be found";
                ctx.status = 400;
            } else {
                console.log("updated");
                ctx.body = "Successfully updated " + result;
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
            const saved = await result.save();

            if(!saved) {
                ctx.body = "Company could not be saved to database";
                ctx.status = 400;
            }
            if(!result) {
                ctx.body = "Company could not be created";
                ctx.status = 400;
            }
            else{
                ctx.body = "Company successfully created";
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
            const result = await company.findOneAndUpdate({name: ctx.request.query.name}, {$set: {city : "Tirana"}, new: true});

            console.log(result);

            if (!result) {
                console.log("cant be found");
                ctx.body = "Company can not be found";
                ctx.status = 400;
            } else {
                console.log("updated");
                ctx.body = "Successfully updated " + result;
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    },showCompany: async (ctx, next) => {
        try {
            const result = await company.findOne({name: ctx.request.query.name});

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
            const result = await company.findOneAndRemove({name: ctx.request.query.name});

            if(!result){
                ctx.body = "Can not delete company";
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