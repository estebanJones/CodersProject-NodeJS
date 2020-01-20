const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

const User = require("../models/users");
const Project = require("../models/project");
const Candidat = require("../models/candidat");
const Teammate = require("../models/teammate");

function error500(resp, args) {
    return resp.status(500).json({
        state: "Une erreur est survenue :" + args
    })
}

exports.newCandidat = (req, res, next) => {
    // JE RECUPERE L ID USER
    User.findOne({ _id: req.body.userId })
    // CANDIDAT TROUVE
        .then(candidat => {
            // JE RECUPERE L ID PROJET
            Project.findOne({_id: req.body.projectId})
                .then(projet => {
                    console.log(projet._id)

                    // SI NON JE CREER UN CANDIDAT
                    const newCandidat = new Candidat({
                        _id: mongoose.Types.ObjectId(),
                        name: candidat.username,
                        user_id: candidat._id,
                        project_id: projet._id,
                        message: req.body.message
                    });

                    return newCandidat.save((err, isValid) => {
                        if(err) {
                            error500(res, err);
                        }
                        if (isValid) {
                            return res.status(200).json({
                                state: "Vous avez candidaté avec succès"
                            })
                        }
                    });
                })
                .catch(err => {
                   error500(res, err);
                })
        })
        .catch(err => {
            error500(res, err);
        })
}

exports.removeCandidat = (req, res, next) => {
    Candidat.remove({user_id: req.body.userId})
        .then(sucess => {
            return res.status(200).json({
                state: "Le candidat à bien été supprimé !"
            })
        })
        .catch(err => {
            error500(res, err);
        })
    

}

exports.acceptCandidat = (req, res, next) => {
    // JE RECUPERE LE CANDIDAT ID 
    Candidat.findOne({user_id: req.body.userId})
        .then(candidat => {
            // JE RECUPERE LE PROJET ID
            Project.findOne({_id: req.body.projectId})
                .then(projet => {
                    const teammate = new Teammate({
                        _id: mongoose.Types.ObjectId(),
                        user_id: req.body.userId,
                        project_id: projet.id
                    });

                    return teammate.save((err, isValid) => {
                        if (err) {
                            error500(res, err);
                        }
                        if (isValid) {
                            Candidat.remove({user_id: req.body.userId})
                                .then(result => {
                                    return res.status(200).json({
                                        state: "Candidat accepté !"
                                    });
                                })
                                .catch(err => {
                                    error500(res, err);
                                })
                        }
                    });
                })
                .catch(err => {
                    error500(res, err);
                })
        .catch(err => {
            error500(res, err);
        })
    })
}

exports.showAllCandidats = (req, res, next) => {
    Candidat.find({project_id: req.body.projectId})
        .then(candidats => {
            console.log(candidats.length);
            if (candidats.length <= 0) {
                return res.status(405).json({
                    state: "Vous n'avez aucun candidat"
                });
            }

            return res.status(200).json({
                listCandidats: candidats
            });
        })
        .catch(err => {
            error500(res, err);
        })
}

exports.showOneCandidat = (req, res, next) => {
    Candidat.find({user_id: req.body.userId})
        .then(candidat => {
            return res.status(200).json({
                candidat: candidat
            });
        })
        .catch(err => {
            error500(res, err);
        })
}
