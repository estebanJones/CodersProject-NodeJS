const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    id_: mongoose.Schema.Types.ObjectId,
    username: { type: String, require: true, unique: true},
    email: { 
        type: String, 
        require: true, 
        unique: true, 
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    roles: { type: JSON, require: false},
    password: { type: String, require: true },
    specialisation: { type: String, require: false },
    dateInscription: { type: Date, require: true },
    candidatId: { type: mongoose.Types.ObjectId, require: false},
    teammate_id: { type: mongoose.type.ObjectId, require: false}
});

exports.module = mongoose.Schema('User', userSchema);