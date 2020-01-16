const express = require("express");

const router = express.router();
const checkAuth = require("../middlewares/check-auth");
const teammateController = require("../controller/teammateController");


// SHOW MANAGER 
router.post("/teammate/project/show/manager", checkAuth, teammateController.showManager)

// SWITCH ROLE
router.post("/teammate/project/switch/roles", checkAuth, teammateController.switchRole)

// Remove user
router.delete("/teammate/project/delete", checkAuth, teammateController.remove)

// SHOW ALL
router.post("/teammate/project/show/all", teammateController.showAll)


module.exports = router;
