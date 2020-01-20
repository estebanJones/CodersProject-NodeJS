const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Task = require("../models/task");
const JWT = require("jsonwebtoken");

// FONCTION ERROR 500
function error500(resp, args) {
    return resp.status(500).json({
        state: "Une erreur est survenue :" + args
    })
}

exports.createTask = (req, res, next) => {
    const task = new Task({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        task_importance: req.body.taskImportance,
        project_id: req.params.projectId,
        teammate_id: req.params.teammateId
    })
    return task.save((err, isValid) => {
        if (err) {
            error500(res, err);
        }
        if (isValid) {
            return res.status(200).json({
                state: "Inscription réussi !"
            });
        }
    })

}

exports.updateTask = (req, res, next) => {
    Task.remove({_id: req.params.id})
        .then(result => {
            return res.status(200).json({
                state: "Tache supprimé"
            })
        })
        .catch(err => {
            error500(res, err);
        })


}

exports.deleteTask = (req, res, next) => {
    Task.remove({_id: req.params.id})
        .then(result => {
            return res.status(200).json({
                state: "Tache supprimé"
            })
        })

}

exports.showOneTask = (req, res, next) => {
    Task.find({_id: req.params.taskId})
        .then(task => {
            return res.status(200).json({
                task: task
            })
        })
        .catch(err => {
            error500(res, err);
        })
}

exports.showAllTasks = (req, res, next) => {
    Task.find()
        .select("title content task_importance")
        .then(tasks => {
            return res.status(200).json({
                tasks: tasks
            });
        })
        .catch(err => {
            error500(res, err);
        })
}

