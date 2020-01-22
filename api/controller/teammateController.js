const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Teammate = require("../models/teammate");
const JWT = require("jsonwebtoken");
const User = require("../models/users");
const Project = require("../models/project");


function error500(resp, args) {
    return resp.status(500).json({
        state: "Une erreur est survenue :" + args
    })
}
// SHOW MANAGER
exports.showTeammate = (req, res, next) => {
    Teammate.findOne({ user_id: req.params.userId })
        .then(teammate => {
            return res.status(200).json({
                object: teammate
            })
        })
        .catch(err => {
            error500(err);
        })
}

exports.showAllTeammate = (req, res, next) => {
    // JE ME CONNECTE A MA BDD MONGO
    // MongoClient.connect(url, function (err, db) {
    //     // SI ERREUR RENVOYER
    //     if (err) throw err;
    //     // SINON CONNEXION
    //     var dbo = db.db("codersproject");
    //     // FOUILLE DANS LA TABLE USER ET FETCH MOI LA TOTALITE
    //     dbo.collection("Teammate").find({}).toArray(function (err, listeTeammate) {
    //         if (err) {
    //             return res.status(500).json({
    //                 state: "Une erreur est survenue :" + err
    //             })
    //         }

    //         res.status(200).json({
    //             object: listeTeammate
    //         })
    //         db.close();
    //     });
    // });

    Project.findOne({ _id: req.body.projectId })
        .then(project => {
            console.log(project)
        })



}
// SWITCH ROLE TEAMMATE
exports.switchRoleTeammate = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })

}

// REMOVE TEAMMATE
exports.removeTeammate = (req, res, next) => {
    Teammate.remove({ user_id: req.params.userId })
        .then(result => json.status(200).json({
            state: "Teammate supprimé avec succès"
        }))
        .catch(err => {
            error500(err);
        })


}

exports.getPseudoTeammateByProject = (req, res, next) => {
    Teammate.find({ project_id: req.body.projectId })
        .then(teammate => {

            User.find({ _id: teammate.user_id })
                .then(member => console.log(member))
                .catch(err => res.status(500).json({
                    state: err
                }))
        })
        .catch(err => res.status(500).json({
            state: err
        }))


}

// SHOW ALL TEAMMATE