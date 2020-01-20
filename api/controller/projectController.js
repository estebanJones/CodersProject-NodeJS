const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Project = require("../models/project");
const JWT = require("jsonwebtoken");
const Teammate = require("../controller/teammateController");


// function error500(resp, args) {
//     return resp.status(500).json({
//         state: "Une erreur est survenue :" + args
//     })
// }

exports.createProject = (req, res, next) => {
    const project = new Project({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        coders_join_confirmed: req.body.coders_join_confirmed,
        coders_com_post: req.body.coders_com_post,
        coders_can_create_task: req.body.coders_can_create_task
    });

    // User.findOne({ _id: req.body.id })
    // const teammate = new Teammate({
    //     _id: mongoose.Schema.Types.ObjectId,
    //     user_id: { type: mongoose.Types.ObjectId, require: true },
    //     project_id: { type: mongoose.Types.ObjectId, require: true },
    //     task_id: { type: mongoose.Types.ObjectId, require: false },
    //     role: { type: String, require: false }
    // })

    return project.save((err, isValid) => {
        if (err) {
            return res.status(500).json({
                state: "erreur"
            });
        }
        if (isValid) {
            return res.status(200).json({
                state: "Projet créé avec succès !"
            });
        }
    });
}

exports.updateProject = (req, res, next) => {

    const ops = {};

    for (const op of req.body) {
        ops[op.propName] = op.value;
        console.log(ops[op.propName]);
    }

    Project.post({ _id: req.params.projectId }, { $set: ops })
        .then(result => {
            return res.status(200).json({
                state: "Projet mis à jour"
            });
        })
        .then(err => {
            return res.status(500).json({
                state: err
            });
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