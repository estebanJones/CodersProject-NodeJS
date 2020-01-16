const mongoose = require("mongoose");

const teammateSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {type: mongoose.Types.ObjectId, require: true},
    project_id: { type: mongoose.Types.ObjectId, require: true},
    task_id: { type: mongoose.Types.ObjectId, require: false},
    role: { type: mongoose.Types.ObjectId, require: false}
});

exports.module = mongoose.Schema("Teammate", teammateSchema);