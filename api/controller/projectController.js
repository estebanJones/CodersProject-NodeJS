const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Project = require("../models/project");
const JWT = require("jsonwebtoken");
const Teammate = require("../models/teammate");


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
        coders_join_confirmed: false,
        coders_com_post: false,
        coders_can_create_task: false
    });

    const teammate = new Teammate({
        _id: mongoose.Types.ObjectId(),
        user_id: req.body.user_id,
        project_id: project._id,
        role: "manager"
    });

    return project.save((err, isValid) => {
        if (err) {
            return res.status(500).json({
                state: "erreur"
            });
        }
        if (isValid) {
            return teammate.save((err, isValid) => {
                if (err) {
                    return res.status(500).json({
                        state: "erreur"
                    });
                }
                if (isValid) {
                    res.status(200).json({
                state: "Projet créé avec succès !"
                })
            };
        }
    );
}
    })}

exports.updateProject = (req, res, next) => {
    Project.patch({ _id: req.params.projectId })

    return res.status(200).json({
        state: "Le projet a etait mise a jour !"
    });

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
    Project.findOne({ _id: req.body.projectId })
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