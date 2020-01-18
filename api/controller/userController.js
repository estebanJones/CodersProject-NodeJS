const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/users");
const JWT = require("jsonwebtoken");

// login
exports.login = (req, res, next) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (!user) {
                return res.status(403).json({
                    state: "Identifiant incorrect"
                })
            }
            return bcrypt.compare(req.body.password, user.password, (err, isValid) => {
                if (err) {
                    return res.status(500).json({
                        state: err
                    })
                }
                if (isValid) {
                    return res.status(200).json({
                        state: "Connexion successfull",
                        token: JWT.sign(
                            {
                                userId: req.body._id,
                                mail: user.mail
                            },
                            process_env_JTW_KEY,
                            {
                                expiresIn: "10h"
                            }
                            
                        )
                    });
                } else {
                    return res.status(403).json({
                        state: "Password incorrect"
                    })
                }
            });
        });
}   

// LOGOUT
exports.logout = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })
    // findOne({ _id: req.body.userId })
    //     .then()
}

// INSCRIPTION
exports.createUser = (req, res, next) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (user) {
                return res.status(200).json({
                    state: "Le pseudo est déjà utilisé"
                })
            }
            // JE RETOURNE LE HASH DANS LA PROMESSE
            return bcrypt.hash(req.body.password, 10);
        })
        .then(hash => {
            const user = new User({
                _id: mongoose.Schema.Types.ObjectId,
                username: req.body.username,
                email: req.body.email,
                roles: req.body.role,
                password: hash,
                specialisation: req.body.specialisation,
                dateInscription: req.body.dateInscription,
                candidatId: req.body.candidatId,
                teammateId: req.body.teammateId
            })
        })
        .then(result => {
            return res.status(200).json({
                state: "Inscription réussi !"
            })
        })
        .catch(err => {
            return res.status(500).json({
                state: "Une erreur est survenu : " + err
            })
        })
}

exports.updateUser = (req, res, next) => {
    const updateOption = {};
    for (const option of req.body) {
        updateOption[option] = option.value
    }
    User.patch({_id: req.body.userId}, {$set: updateOption})
    .then(result => {
        return res.status(200).json({
            state: "Mise à jour réuissi"
        })
    })
    .catch(err => {
        state: err
    })
}

exports.deleteUser = (req, res, next) => {
    User.remove({ _id: req.body.userId })
        .then(data => {
            return res.status(200).json({
                state: "Le compte à bien été supprimé !"
            })
        })
        .catch(err => {
            state: "Une erreur est survenue " + err
        })
}

exports.showOneUser = (req, res, next) => {
    User.findOne({_id: req.body.userId})
        .then(data => {
            res.status(200).json({
               message: data
            })
        })
        .catch(err => {
            state: err
        })
}

exports.showAllUsers = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })

}
