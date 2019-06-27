const userModel = require("./.././models/userSchema");
const jwt = require('jsonwebtoken');
const jwtsecret = "kns2018";
const venue = require("./.././models/venueSchema");
const company = require("./.././models/managementCompany");

module.exports = {
    signIn: async (ctx) => {
        try {
            console.log(ctx.request.body);
            ctx.body = {
                message : await userModel.User.create(ctx.request.body),
                success : true
            };
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                message : err.errmsg,
                success : false
            };
        }

    },
    login: async (ctx) => {
        if (ctx.result) {
            const payload = {
                id: ctx.result._id,
            };
            const token = jwt.sign(payload, jwtsecret, {expiresIn: '4 days'}); //JWT is created here

            ctx.body = {
                success: true,
                message : "Welcome " + ctx.result.email,
                data : {
                    token : "JWT " + token
                }
            };
        } else {
            ctx.body = {
                message : "Login failed.",
                success : false
            };
        }
    },
    deleteVenue: async (ctx) => {
        try {
            const result = await venue.findOneAndRemove({_id: ctx.params._id});

            if (!result) {
                ctx.body = {
                    message : "Venue can not be deleted.",
                    success: false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    success: true,
                    message: "Venue successfully deleted.",
                };
            }
        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                success : false,
                message : err
            };
        }
    },
    addNewVenue: async (ctx) => {
        try {
            const result = await venue.create(ctx.request.body);

            if (!result) {
                ctx.body = {
                    message : "Venue can not be created.",
                    success : false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    success: true,
                    message: "Venue successfully created.",
                    data: result
                };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                success : false,
                message : err
            };
        }
    },
    readVenue: async (ctx) => {
        try {
            const result = await venue.findOne({_id: ctx.params._id})
                .populate('managingCompany')
                .lean();

            if (!result) {
                ctx.body = {
                    message : "Venue can not be found.",
                    success : false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    data : result,
                    message : "Venue successfully found.",
                    success : true
                };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message : err,
                success : false
            };
        }
    },
    readAllVenues: async (ctx) => {
        try {
            const result = await venue.find({})
                .populate('managingCompany')
                .lean();

            if (!result) {
                ctx.body = {
                    message : "Venues can not be read.",
                    success : false,
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    message : "Venues successfully read.",
                    success : true,
                    data : result
                };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message : err,
                success : false
            };
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
                ctx.body = {
                    message : "Venue can not be found.",
                    success : false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    message : "Venue successfully updated.",
                    data : result,
                    success : true
                };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message : err,
                success : false
            };
        }
    },
    addNewCompany: async (ctx) => {
        try {
            const result = await company.create(ctx.request.body);

            if (!result) {
                ctx.body = {
                    message : "Company can not be created.",
                    success : false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    message : "Company successfully created.",
                    success : true,
                    data : result
                };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message : err,
                success : false
            };
        }
    },
    updateCompany: async (ctx) => {
        try {
            const result = await company.findOneAndUpdate({_id: ctx.params._id}, ctx.request.body, {
                upsert: true,
                new: true
            });

            if (!result) {
                ctx.body = {
                    message : "Company can not be found.",
                    success : false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    message: "Company successfully updated.",
                    data : result,
                    success : true
                };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                success : false,
                message : err
            };
        }
    },
    readCompany: async (ctx) => {
        try {
            const result = await company.findOne({_id: ctx.params._id});

            if (!result) {
                ctx.body = {
                    message : "Company can not be found.",
                    success : false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    message : "Company successfully found.",
                    data : result,
                    success : true
                };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message : err,
                success : false
            };
        }
    },
    deleteCompany: async (ctx) => {
        try {
            const result = await company.findOneAndRemove({_id: ctx.params._id});

            if (!result) {
                ctx.body = {
                    message : "Company can not be deleted.",
                    success : false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    message : "Company successfully deleted.",
                    success : true
                };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message : err,
                success : false
            };
        }
    },
    readAllCompanies: async (ctx) => {
        try {
            const result = await company.find({});

            if (!result) {
                ctx.body = {
                    message : "Company can not be found.",
                    success : false
                };
                ctx.status = 400;
            } else {
                ctx.body = {
                    message : "Companies successfully read.",
                    success : true,
                    data : result
                };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = {
                message : err,
                success : false
            };
        }
    }
};