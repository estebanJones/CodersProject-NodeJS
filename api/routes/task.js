const express = require("express");

const router = express.router();
const checkAuth = require("../middlewares/check-auth");
const taskController = require("../controller/taskController");


// Create task
router.post("/user/create_task", checkAuth, taskController.createTask)

// Update task
router.patch("/user/update_task", checkAuth, taskController.updateTask)

// Remove task
router.delete("/user/delete_task", checkAuth, taskController.delete)

// SHOW ONE TASK
router.post("/user/show_one_task", taskController.showOneTask)

// SHOW ALL TASKS
router.post("/user/task/show/all", taskController.showAllTask)

// ATTRIBUT TASK
//router.post("/dev/attribut_task")


module.exports = router;
