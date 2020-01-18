const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Candidat = require("../models/candidat");
const JWT = require("jsonwebtoken");


exports.newCandidat = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })

}

exports.removeCandidat = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })

}

exports.acceptCandidat = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })


}

exports.showAllCandidats = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })


}

exports.showOneCandidat = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })

    
}