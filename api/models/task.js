const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, require: true},
    content: { type: String, require: true},
    task_importance: { type: String, require: true},
    project_id: { type: mongoose.Types.ObjectId, require: true},
    teammate_id: { type: mongoose.Types.ObjectId, require: false}
});

exports.module = mongoose.Schema("Task", taskSchema);