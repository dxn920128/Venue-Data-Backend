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
            const result = await venue.findOneAndRemove({_id : ctx.params._id});

            console.log(ctx.params._id);

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
            const result = await venue.findOne({_id: ctx.params._id});

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
    readAllVenues: async (ctx) => {
        try {
            const result = await venue.find({});

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
            const result = await venue.findOneAndUpdate({_id: ctx.params._id}, ctx.request.body, {upsert:true, new : true});

            if (!result) {
                ctx.body = "Venue can not be found";
                ctx.status = 400;
            } else {
                ctx.body = "Venue successfully updated\n" + result;
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
            const result = await company.findOneAndUpdate({_id: ctx.params._id}, ctx.request.body, {upsert:true, new : true});

            if (!result) {
                ctx.body = "Company can not be found";
                ctx.status = 400;
            } else {
                ctx.body = "Company successfully updated\n" + result;
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
            const result = await company.findOne({_id: ctx.params._id});

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
            const result = await company.findOneAndRemove({_id: ctx.params._id});

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
    },
    readAllCompanies: async (ctx) => {
        try {
            const result = await company.find({});

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
    }
};