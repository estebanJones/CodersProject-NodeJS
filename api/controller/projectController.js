const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Project = require("../models/project");
const JWT = require("jsonwebtoken");


function error500(resp, args) {
    return resp.status(500).json({
        state: "Une erreur est survenue :" + args
    })
}

exports.createProject = (req, res, next) => {
    const project = new Project({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        coders_join_confirmed: req.body.coders_join_confirmed,
        coders_com_post: req.body.coders_com_post,
        coders_can_create_task: req.body.coders_can_create_task
    });

    return project.save((err, isValid) => {
        if (err) {
            error500(res, err);
        }
        if(isValid) {
            return res.status(200).json({
                state: "Projet créé avec succès !"
            })
        }
    });
}

exports.updateProject = (req, res, next) => {
    return res.status(200).json({
        state: "Le compte à bien été supprimé !"
    });

}

exports.deleteProject = (req, res, next) => {
    Project.remove({ _id: req.params.projectId })
        .then(result => {
            return res.status(200).json({
                state: "Projet supprimé avec succès"
            });
        })
        .catch(err => {
            error500(res, err)
        })

}

exports.showOneProject = (req, res, next) => {
    // JE CHERCHE LE USER PAR RAPPORT A L ID
    Project.findOne({ _id: req.params.projectId })
        // JE LUI RENVOIE LE USER
        .then(project => {
            res.status(200).json({
               project: project
            })
        })
        .catch(err => {
            error500(res, err);
        })


}

exports.showAllProject = (req, res, next) => {
    Project.find()
        .select("title description")
        .then(projects => {
            return res.status(200).json({
                projects: projects
            });
        })
        .catch(err => {
            error500(res, err);
        })
}