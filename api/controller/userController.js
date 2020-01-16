const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/users");
const JWT = require("jsonwebtoken");

// login
exports.login = (req, res, next) => {
    console.log(req.body)
}

// LOGOUT
exports.logout = (req, res, next) => {


}

// INSCRIPTION
exports.create = (req, res, next) => {
    console.log(req.body);

}

exports.update = (req, res, next) => {
    console.log(req.body)

}

exports.delete = (req, res, next) => {
    console.log(req.body)

}

exports.showOne = (req, res, next) => {
    console.log(req.body)

}

exports.showAll = (req, res, next) => {
    console.log(req.body)

}
