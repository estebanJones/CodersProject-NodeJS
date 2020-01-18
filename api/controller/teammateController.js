const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Teammate = require("../models/teammate");
const JWT = require("jsonwebtoken");


function error500(args) {
    return res.status(500).json({
        state: "Une érreur est survenue :" + args
    })
}

// SHOW MANAGER
exports.showTeammate = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
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
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })


}

// SHOW ALL TEAMMATE
exports.showAllTeammate = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })


}