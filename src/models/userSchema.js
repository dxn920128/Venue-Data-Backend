const crypto = require('crypto');
const mongoose = require('mongoose'); // standard module for  MongoDB
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; // Auth via JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // Auth via JWT
const jwtsecret = "kns2018"; // signing key for JWT

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
    const _is = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
    if (!password) return false;
    if (!this.passwordHash) return false;
    return _is;
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
            console.log("Found a user ", user);
            if (err) {
                return done(err);
            }
            if (!user){
                return done(err);
            }
            const checked =  user.checkPassword(password);

            if (!checked) {
                return done(null, false, {message: 'User does not exist or wrong password.'});
            }
            return done(null, user);
        });
    }
    )
);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: jwtsecret
};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
        User.findById(payload.id, (err, user) => {
            console.log(payload.id);
            
            if (err) {
                return done(err)
            }
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        })
    })
);


module.exports = {User, passport};