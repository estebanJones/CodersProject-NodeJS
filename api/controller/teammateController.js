const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Teammate = require("../models/teammate");
const User = require("../models/users");
const JWT = require("jsonwebtoken");

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
                    role: teammate.role
                }))
            );
        })
        .catch(err => {
            error500(err);
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
   Teammate.remove({user_id: req.params.userId})
    .then(result => {
        state: "Teammate supprimé avec succès"
    })
    .catch(err => {
        error500(err);
    })


}

// SHOW ALL TEAMMATE