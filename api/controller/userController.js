const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/users");
const JWT = require("jsonwebtoken");

// login

exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user >= 1) {
                return res.status(200).json({

                })
            }
        })
}

// LOGOUT
exports.logout = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user = !username) {
                return res.status(409).json({
                    error: "Utilisateur incorrect"
                });
            }
            bcrypt.compare(req.body.password, user.password, (error, isValid) => {
                if (error) {
                    return res.status(500).json({
                        error: error

                    });
                }
                if (isValid) {
                    return res.status(200).json({
                        success: "Connexion successfull",
                        token: JWT.sign(
                            {
                                userId: user.id,
                                mail: user.mail
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "24h"
                            }
                        )
                    });
                }
                else {
                    return res.status(401).json({
                        message: "Invalid password"
                    })
                }
            })
                .catch(error => {
                    res.status(500).json({
                        message: "Une erreur est survenu",
                        error: error
                    });
                });
        })
}

// INSCRIPTION
exports.create = (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    error: "L'email existe déjà"
                })
            }
            return bcrypt.hash(req.body.password, 10);
        })
        .then(hash => {
            const user = new User({
                _id: mongoose.Schema.Types.ObjectId,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                dateInscription: new Date.now()
            });

            return user.save((err, isValid) => {

                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else if (isValid) {
                    return res.status(200).json({
                        message: "Nouvel utilisateur ajouté",
                        token: JWT.sign(
                            {
                                userId: user._id,
                                mail: user.email
                            },
                            process.env.JWT_KEY,
                            {
                                expriresIn: "24h"
                            }
                        )
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })


}

exports.update = (req, res, next) => {

    const updateUser = {};
    for (const data of req.body) {
        updateUser[value.propsName] = data.value;
    }

    User.update({ _id: req.params.userId })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
}

exports.delete = (req, res, next) => {

    User.remove({ _id: req.body.id })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.showOne = (req, res, next) => {

    User.find({ _id: req.params.userId })
        .then(user => {
            res.status(200).json({
                "user": user
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.showAll = (req, res, next) => {

    User.findAll({ User })
    .then(res => {
        res.status(200).json({

        })
    })

}
