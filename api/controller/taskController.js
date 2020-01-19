const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Task = require("../models/task");
const JWT = require("jsonwebtoken");



exports.createTask = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })

}

exports.updateTask = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })


}

exports.deleteTask = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })


}

exports.showOneTask = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })


}

exports.showAllTasks = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    })


}

