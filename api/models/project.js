const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String, require: true},
    task_id: {type: mongoose.Types.ObjectId, require: false},
    candidat_id: {type: mongoose.Types.ObjectId, require: false},
    teammate_id: {type: mongoose.Types.ObjectId, require: false},
    coders_join_confirmed: {type: mongoose.Types.ObjectId, require: false},
    coders_com_post: {type: mongoose.Types.ObjectId, require: false},
    coders_can_create_task: {type: mongoose.Types.ObjectId, require: false}

});

module.exports = mongoose.model("Project", projectSchema);