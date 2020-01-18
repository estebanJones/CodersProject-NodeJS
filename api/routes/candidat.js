const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const candidatController = require("../controller/candidatController");


// add new candidat
router.post("/new", checkAuth, candidatController.newCandidat)

// Remove project
router.delete("/remove", checkAuth, candidatController.removeCandidat)

// Accept candidat
router.post("/accept", checkAuth, candidatController.acceptCandidat)

// SHOW ALL CANDIDAT
router.post("/show/all", checkAuth, candidatController.showAllCandidats)

// SHOW ONE
router.post("/show/one", checkAuth, candidatController.showOneCandidat)

module.exports = router;
