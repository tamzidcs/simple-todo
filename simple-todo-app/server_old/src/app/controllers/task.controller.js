const db = require("../models");
const Task = db.task;

exports.create = (req, res) => {
    Task.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }).then(task=>{
        res.send(task);
    })
};

// exports.findAll = (req, res) => {
//     Task.findAll().then(task =>{
//         res.send(task);
//     })
// };

// exports.findById = (req, res) => {
//     Task.findById().then(task =>{
//         res.send(task);
//     })
// };

// exports.findByUsername = (req, res) => {
//     Task.findOne({where:{username: req.body.username}}).then(task =>{
//       res.send(task);
//     })
// };