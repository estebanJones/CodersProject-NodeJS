const express = require("express");

const router = express.router();
const checkAuth = require("../middlewares/check-auth");
const candidatController = require("../controller/candidatController");


// add new candidat
router.post("user/candidat/new", checkAuth, candidatController.newCandidat)

// Remove project
router.delete("/candidat/remove", checkAuth, candidatController.removeCandidat)

// Accept candidat
router.post("manager/candidat/accept", checkAuth, candidatController.acceptCandidat)

// SHOW ALL CANDIDAT
router.post("/candidat/show/all", checkAuth, candidatController.showAll)

// SHOW ONE
router.post("/candidat/show/one", checkAuth, candidatController.showOne)

module.exports = router;
