const User = require('../models/User.model')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const passport = require('passport')

passport.serializeUser((loggedInUser, done) => {

    console.log(loggedInUser)
    console.log(loggedInUser instanceof User)


    if (loggedInUser instanceof User) {
        done(null, { id: loggedInUser._id, type: "User" })
    } else {
        done(null, { id: loggedInUser._id, type: "Teacher" })
    }
})

passport.deserializeUser((userIdFromSession, cb) => {

    if (userIdFromSession.type === "User") {

        User.findById(userIdFromSession.id, (err, userDocument) => {
            if (err) {
                cb(err)
                return
            }
            cb(null, userDocument)
        })
    } else {
        Teacher.findById(userIdFromSession.id, (err, userDocument) => {
            if (err) {
                cb(err)
                return
            }
            cb(null, userDocument)
        })
    }
})

passport.use("user-login", new LocalStrategy((username, password, next) => {

    User.findOne({ username }, (err, foundUser) => {
        if (err) {
            next(err)
            return
        }
        if (!foundUser) {
            next(null, false, { message: 'Usuario no registrado.' })
            return
        }
        if (!bcrypt.compareSync(password, foundUser.password)) {
            next(null, false, { message: 'Contraseña incorrecta.' })
            return
        }
        next(null, foundUser)
    })
}))


// passport.use("teacher-login", new LocalStrategy((username, password, next) => {

//     Teacher.findOne({ username }, (err, foundUser) => {

//         if (err) {
//             next(err)
//             return
//         }
//         if (!foundUser) {
//             next(null, false, { message: 'Usuario no registrado.' })
//             return
//         }
//         if (!bcrypt.compareSync(password, foundUser.password)) {
//             next(null, false, { message: 'Contraseña incorrecta.' })
//             return
//         }
//         next(null, foundUser)
//     })
// }))