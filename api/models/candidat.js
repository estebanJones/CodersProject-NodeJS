const mongoose = require("mongoose");

const candidatSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    user_id: { type: mongoose.Types.ObjectId, require: true },
    project_id: { type: mongoose.Types.ObjectId, require: true},
    message: { type: String, require: false}
});

module.exports = mongoose.model('Candidat', candidatSchema)