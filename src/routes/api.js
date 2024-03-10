const express = require("express");
const userController = require("../controller/userController.js");
const taskController = require("../controller/taskController.js");
const AuthMiddleWare = require("../middleware/AuthMiddleWare.js");

const router = express.Router();


// users route

router.post("/registration", userController.registration);
router.post("/login", userController.login);


// after login manage user

router.get("/profileDetails", AuthMiddleWare, userController.profileDetail);
router.post("/profileUpdate", AuthMiddleWare, userController.profileUpdate)



// tasks route
router.post("/task/create", AuthMiddleWare, taskController.create);
router.post("/task/update/:id", AuthMiddleWare, taskController.update);
router.get("/task/read", AuthMiddleWare, taskController.read);
router.get("/task/delete/:id", AuthMiddleWare, taskController.delete);
router.post("/task/updateStatus/:id", AuthMiddleWare, taskController.updateStatus);

module.exports = router;