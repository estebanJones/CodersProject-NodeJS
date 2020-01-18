const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const taskController = require("../controller/taskController");


// Create task
router.post("/create_task", checkAuth, taskController.createTask)

// Update task
router.patch("/update_task", checkAuth, taskController.updateTask)

// Remove task
router.delete("/delete_task", checkAuth, taskController.deleteTask)

// SHOW ONE TASK
router.post("/show_one_task", taskController.showOneTask)

// SHOW ALL TASKS
router.post("/task/show/all", taskController.showAllTasks)

// ATTRIBUT TASK
//router.post("/dev/attribut_task")


module.exports = router;
