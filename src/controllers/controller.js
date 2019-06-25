const userModel = require("./.././models/userSchema");
const jwt = require('jsonwebtoken');
const jwtsecret = "mysecretkey";
const venue = require("./.././models/venueSchema");
const company = require("./.././models/managementCompany");

module.exports = {
    signIn: async (ctx) => {
        try {
            console.log(ctx.request.body);
            ctx.body = await userModel.User.create(ctx.request.body);
        } catch (err) {
            ctx.status = 400;
            ctx.body = err.errmsg;
        }

    },
    login: async (ctx) => {
        if (ctx.result) {
            console.log(ctx.result);
            console.log(ctx.result.email);
            const payload = {
                id: ctx.result._id,
            };
            const token = jwt.sign(payload, jwtsecret, {expiresIn: '4 days'}); //JWT is created here

            ctx.body = {user: ctx.result.email, token: 'JWT ' + token};
        } else {
            console.log("User is " + ctx.result);
            ctx.body = "Login failed";
        }

        /*await userModel.passport.authenticate('local', function (err, user) {
            if (user == false || user == undefined || user._id === undefined) {
                console.log("User is " + user);
                ctx.body = "Login failed";
            } else {
                console.log(user);
                console.log(user.email);
                //--payload - info to put in the JWT
                const payload = {
                    id: user._id,
                };
                const token = jwt.sign(payload, jwtsecret); //JWT is created here

                ctx.body = {user: user.email, token: 'JWT ' + token};
            }
        })(ctx, next);*/
    },
    deleteVenue: async (ctx) => {
        try {
            const result = await venue.findOneAndRemove({_id: ctx.params._id});

            console.log(ctx.params._id);

            if (!result) {
                ctx.body = "Can not delete venue";
                ctx.status = 400;
            } else {
                ctx.body = {
                    success: true,
                    message: "Venue successfully deleted",
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = err;
        }
    },
    addNewVenue: async (ctx) => {
        try {
            const result = await venue.create(ctx.request.body);

            if (!result) {
                ctx.body = "Venue could not be created";
                ctx.status = 400;
            } else {
                ctx.body = {
                    success: true,
                    message: "Venue successfully created",
                    data: result
                };
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
            const result = await venue.findOneAndUpdate({_id: ctx.params._id}, ctx.request.body, {
                upsert: true,
                new: true
            });

            console.log(ctx.request.body);

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
    addNewCompany: async (ctx) => {
        try {
            const result = await company.create(ctx.request.body);

            if (!result) {
                ctx.body = "Company could not be created";
                ctx.status = 400;
            } else {
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
            const result = await company.findOneAndUpdate({_id: ctx.params._id}, ctx.request.body, {
                upsert: true,
                new: true
            });

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

            if (!result) {
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