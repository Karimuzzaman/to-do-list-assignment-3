const jwt = require("jsonwebtoken");
const TaskModel = require("../model/TasksModel");

exports.create = async (req, res) => {
    try {

        let email = req.headers['email'];
        let reqBody = req.body;
        reqBody.email = email;
        await TaskModel.create(reqBody);
        res.json({ status: "success", message: "Task successfully created" })

    } catch (error) {
        res.json({ status: "fail", message: "unsuccessfull" })
    }
}

exports.read = async (req, res) => {
    try {
        let email = req.headers['email'];
        let task = await TaskModel.find({ email: email })
        res.json({ status: "success", message: "Task successfully read", data: task })

    } catch (error) {
        res.json({ status: "fail", message: "unsuccessfull" })
    }

}

exports.update = async (req, res) => {
    try {
        let email = req.headers['email'];
        let id = req.params.id;
        let reqBody = req.body;
        await TaskModel.updateOne({ email: email, _id: id }, reqBody)
        res.json({ status: "success", message: "Task successfully updated" })

    } catch (error) {
        res.json({ status: "fail", message: "unsuccessfull" })
    }

}


exports.delete = async (req, res) => {
    try {
        let email = req.headers['email'];
        let id = req.params.id;
        let deleteTask = await TaskModel.deleteOne({ email: email, _id: id })
        res.json({ status: "success", message: "Task successfully deleted", data: deleteTask })

    } catch (error) {
        res.json({ status: "fail", message: "unsuccessfull" })
    }

}

exports.updateStatus = async (req, res) => {
    try {

        let email = req.headers['email'];
        let id = req.params.id;
        let statusToDo = req.body.statusToDo;

        let postBody = {
            statusToDo: statusToDo
        }

        await TaskModel.updateOne({ email: email, _id: id }, postBody)

        res.json({ status: "success", message: "update status success" })

    } catch (error) {
        res.json({ status: "fail", message: "status update failed" })
    }
}