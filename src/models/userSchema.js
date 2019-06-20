const crypto = require('crypto');
const mongoose = require('mongoose'); // standard module for  MongoDB
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtsecret = "mysecretkey";

//---------Use Schema and Module  ------------------//

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'e-mail is required',
        unique: 'this e-mail already exist'
    },
    passwordHash: String,
    salt: String,
}, {
    timestamps: true
});

userSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })

    .get(function () {
        return this._plainPassword;
    });

userSchema.methods.checkPassword = function (password) {
    if (!password) return false;
    if (!this.passwordHash) return false;
    return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

const User = mongoose.model('User', userSchema);

//----------Passport Local Strategy--------------//

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function (email, password, done) {
        User.findOne({email}, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user || !user.checkPassword(password)) {
                return done(null, false, {message: 'User does not exist or wrong password.'});
            }
            return done(null, user);
        });
    }
    )
);

module.exports = {User, passport};