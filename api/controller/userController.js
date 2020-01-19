const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/users");
const JWT = require("jsonwebtoken");

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:8000/";


// function error500(response, args) {
//     return response.status(500).json({
//         state: "Une érreur est survenue :" + args
//     })
// }

// login
exports.login = (req, res, next) => {
    User.findOne({username: req.body.username})
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
    User.findOne({username: req.body.username})
        .then(user => {
            if (user) {
                return res.status(409).json({
                    state: "Le pseudo est déjà utilisé"
                });
            }
            // JE RETOURNE LE HASH DANS LA PROMESSE
            return bcrypt.hash(() => {
                req.body.password, 10});
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
                    return res.status(500).json({
                        error: err
                    });
                }
                if (isValid) {
                    return res.status(200).json({
                        state: "Inscription réussi !"
                    });
                }

            });
        })
        .catch(err => {
            return res.status(500).json({
                state: "Une erreur est survenue :" + err
            });
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
    // JE CHERCHE LE USER PAR RAPPORT A L ID
    User.findOne({ _id: req.body.userId })
        // JE LUI RENVOIE LE USER
        .then(user => {
            res.status(200).json({
               object: user
            })
        })
        .catch(err => {
            return res.status(500).json({
                state: "Une erreur est survenue :" + err
            })
        })
}

exports.showAllUsers = (req, res, next) => {
    return res.status(200).json({
        state: "yooo"
    })
    // JE ME CONNECTE A MA BDD MONGO
    MongoClient.connect(url, function(err, db) {
        // SI ERREUR RENVOYER
        if (err) {
            return res.status(500).json({
                state: "Une erreur est survenue :" + err
            })
        }
        // SINON CONNEXION
        var dbo = db.db("codersproject");
        // FOUILLE DANS LA TABLE USER ET FETCH MOI LA TOTALITE
        dbo.collection("User").find({}).toArray(function(err, listeUsers) {
 
        res.status(200).json({
            object: listeUsers
         })
          db.close();
        });
      });
}
