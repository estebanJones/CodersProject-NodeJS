const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/users");
const JWT = require("jsonwebtoken");
const CheckAuth = require("../middlewares/check-auth")

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:8000/";


function error500(resp, args) {
    return resp.status(500).json({
        state: "Une erreur est survenue :" + args
    })
}

// login

exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(403).json({
                    state: "Identifiant incorrect"
                });
            }
            return bcrypt.compare(req.body.password, user.password, (err, isValid) => {
                if (err) {
                    return res.status(500).json({
                        state: "Une erreur est survenue :" + err
                    });
                }
                if (isValid) {
                    return res.status(200).json({
                        state: "Connexion successfull",
                        user: user,
                        token: JWT.sign(
                            {
                                userId: user._id,
                                email: user.email
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "10h"
                            }

                        )
                    });
                } else {
                    return res.status(403).json({
                        state: "Password incorrect"
                    });
                }
            });
        });
}

// LOGOUT
exports.logout = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    });
}

// INSCRIPTION
exports.createUser = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                return res.status(409).json({
                    state: "Le pseudo est déjà utilisé"
                });
            }
            // JE RETOURNE LE HASH DANS LA PROMESSE
            return bcrypt.hash(req.body.password, 10);
        })
        .then(hash => {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                roles: req.body.role,
                password: hash,
                specialisation: req.body.specialisation,
                dateInscription: Date.now(),
                candidatId: req.body.candidatId,
                teammateId: req.body.teammateId
            });

            return user.save((err, isValid) => {
                if (err) {
                    error500(res, err);
                }
                if (isValid) {
                    return res.status(200).json({
                        state: "Inscription réussi !"
                    });
                }

            });
        })
        .catch(err => {
            error500(res, err);
        })
}

exports.updateUser = (req, res, next) => {
    // const updateOption = {}; 

    // for (const params of )
    // User.patch({_id: req.body.userId}, {$set: updateOption})
    // .then(result => {
    //     return res.status(200).json({
    //         state: "Mise à jour réussi"
    //     })
    // })
    // .catch(err => {
    //     error500(res, err);
    // })
}

exports.deleteUser = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .then(data => {
            return res.status(200).json({
                state: "Le compte à bien été supprimé !"
            })
        })
        .catch(err => {
            error500(res, err);
        })
}

exports.showOneUser = (req, res, next) => {
    // JE CHERCHE LE USER PAR RAPPORT A L ID
    User.findOne({ _id: req.params.userId })
        // JE LUI RENVOIE LE USER
        .then(user => {
            res.status(200).json({
                object: user
            })
        })
        .catch(err => {
            error500(res, err);
        })
}

exports.showAllUsers = (req, res, next) => {
    User.find()
        .select("username roles specialisation")
        .then(users => {
            return res.status(200).json({
                users: users
            });
        })
        .catch(err => {
            error500(res, err);
        })
}

exports.checkAuthUser = (res, req, next) => {
    if (CheckAuth) {

    }
}
