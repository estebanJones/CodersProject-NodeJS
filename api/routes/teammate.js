const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const teammateController = require("../controller/teammateController");


// SHOW MANAGER 
router.post("/project/show/manager", checkAuth, teammateController.showTeammate)

// SWITCH ROLE
router.post("/project/switch/roles", checkAuth, teammateController.switchRoleTeammate)

// Remove user
router.delete("/project/delete", checkAuth, teammateController.removeTeammate)

// SHOW ALL
router.post("/show_all", teammateController.showAllTeammateByProject)


module.exports = router;
