const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
    const authenticateUser = (username, password) => {

        pool.query(
            `SELECT * FROM users WHERE username = $1`, [username], (err, results) => {
                if (err) {
                    throw err;
                }

                console.log(results.rows);

                if(results.rows.length > 0){
                    const user = results.rows[0];
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err){
                            throw err
                        }
                        if(isMatch){
                            return document(null, user);
                        }else{
                            return document(null, false)
                        }
                    });
                }else {
                    return document(null, false)
                }
            }
        )
    }

    passport.use(
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password"
            },
            authenticateUser
        )
    );
    passport.serializeuser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        pool.query(
            `SELECT * FROM users WHERE id =$1`, [id], (err, results)=> {
                if(err) {
                    throw err
                }
                return done(null, results.rows[0])
            }
        )
    });
}

module.exports = initialize