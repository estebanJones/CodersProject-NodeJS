const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

const User = require("../models/users");
const Project = require("../models/project");
const Candidat = require("../models/candidat");
const Teammate = require("../models/teammate");


function error500(args) {
    return res.status(500).json({
        state: "Une érreur est survenue :" + args
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
                    // SI LE CANDIDAT EXISTE DEJA DANS LE PROJET
                    if(projet.user_id === candidat.id) {
                        return res.status(200).json({
                            state: "Vous avez déjà candidaté"
                        })
                    }
                    // SI NON JE CREER UN CANDIDAT
                    const candidat = new Candidat({
                        _id: mongoose.Types.ObjectId(),
                        user_id: candidat.id,
                        project_id: projet.id,
                        message: req.body.message
                    })
                })
                .then(success => {
                    return res.status(200).json({
                        state: "Vous avez candidaté avec succès"
                    })
                })
                .catch(err => {
                    error500(err)
                })
        })
}

exports.removeCandidat = (req, res, next) => {
    Candidat.remove({user_id: req.body.userId})
        .then(sucess => {
            return res.status(200).json({
                state: "Le compte à bien été supprimé !"
            })
        })
        .catch(err => {
            error500(err)
        })
    

}

exports.acceptCandidat = (req, res, next) => {
    // JE RECUPERE LE CANDIDAT ID 
    Candidat.findOne({user_id: req.body.userId})
        .then(candidat => {
            // JE RECUPERE LE PROJET ID
            Projet.findOne({_id: req.body.projectId})
                .then(projet => {
                    const teammate = new Teammate({
                        _id: mongoose.Types.ObjectId(),
                        user_id: req.body.userId,
                        project_id: projet.id
                    })
                })
                .then(success => {
                    return res.status(200).json({
                        state: "Le candidat à bien été accepté"
                    })
                })
                .catch(err => {
                    error500(err)
                })
        })
}

exports.showAllCandidats = (req, res, next) => {
    Candidat.find({project_id: req.body.idProject})
        .then(candidats => {
            if (candidats.length <= 0) {
                return res.status(200).json({
                    state: "Vous n'avez aucun candidat"
                })
            }

            return res.status(200).json({
                listCandidats: candidats
            })
        })
        .catch(err => {
            error500(err)
        })
}

exports.showOneCandidat = (req, res, next) => {
    Candidat.find({user_id: req.body.userId})
        .then(candidat => {
            return res.status(200).json({
                candidat: candidat
            })
        })
        .catch(err => {
            error500(err)
        })

    
}