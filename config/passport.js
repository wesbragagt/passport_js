const LocalStrategy = require("passport-local").Strategy;
const mysql2 = require("mysql2");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = require("../models/User");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email"
            },
            (email, password, done) => {
                // Match User
                db.User.findOne({
                    where: {
                        email: email
                    }
                })
                    .then(user => {
                        if (!user) {
                            return done(null, false, {
                                message: "that email is not registered"
                            });
                        }

                        // Match the Password
                        bcrypt.compare(
                            password,
                            user.password,
                            (err, isMatch) => {
                                if (err) throw err;
                                if (isMatch) {
                                    return done(null, user);
                                } else {
                                    return done(null, false, {
                                        message: "Password Incorrect"
                                    });
                                }
                            }
                        );
                    })
                    .catch(err => console.log(err));
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log("serializing user: ", user.id);
        done(null, user.id);
    });

    // passport.deserializeUser((id, done) => {
    //     db.User.findByPk(id, (err, user) => {
    //         console.log('deserialize user: ', user);
    //         done(err, user);
    //     });
    // });

    passport.deserializeUser(function(id, done) {
        db.User.findByPk(id, function(err, user) {
            done(err, user);
        });
    });
};
