const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const candidatController = require("../controller/candidatController");


// add new candidat
router.post("/new", candidatController.newCandidat)

// Remove project
router.post("/remove", candidatController.removeCandidat)

// Accept candidat
router.post("/accept", candidatController.acceptCandidat)

// SHOW ALL CANDIDAT
router.post("/show/all", candidatController.showAllCandidats)

// SHOW ONE
router.post("/show/one", candidatController.showOneCandidat)

module.exports = router;
