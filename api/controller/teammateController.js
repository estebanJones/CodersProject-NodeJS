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

exports.showAllTeammateByProject = (req, res, next) => {
    Teammate.find({ project_id: req.body.projectId })
        .select("role")
        .populate("user_id", "username")
        .then(teammates => {
            res.status(200).json(
                teammates.map(teammate => ({
                    id: teammate._id,
                    username: teammate.user_id.username,
                    role: teammate.role,
                    user_id: teammate.user_id._id
                }))
            );
        })
        .catch(err => {
            error500(res, err);
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