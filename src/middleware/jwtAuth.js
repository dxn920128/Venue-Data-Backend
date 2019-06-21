const userModel = require("./.././models/userSchema");

module.exports = async (ctx, next) => {
    try {
        const authResult = await userModel.passport.authenticate('jwt');

        if (authResult) {
            await next();
        } else {
            ctx.body = "JWT Token Error";
            ctx.status = 400;
            console.log("token Err");
        }
    }
    catch (err) {
        console.log("Error here");
        ctx.body = "Outside Error";
        ctx.status = 400;
    }
};
