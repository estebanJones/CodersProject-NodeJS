const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Project = require("../models/project");
const JWT = require("jsonwebtoken");

exports.createProject = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })

}

exports.updateProject = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })

}

exports.deleteProject = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })

}

exports.showOneProject = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })


}

exports.showAllProject = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })


}