const Pool = require('pg').Pool
const config = require('./config/config')
const pool = new Pool(config.db)

module.exports={pool}

const getTaskByUsername = (req, res) => {
    const query = "SELECT task.id,task.title,task.description  FROM task,app_user,task_app_user where task.id=task_app_user.task_id and app_user.id=task_app_user.user_id and app_user.username='"+req.params.username+"' and task.status='open'"
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows).end()
    })
}

const getTaskById = (req, res) => {
    const query = "UPDATE  task SET  status='done' where id="+req.params.taskId
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({'msg':'task updated'}).end()
    })
}

const  getUserId = async (username) =>{  
    let query = "SELECT id from app_user where username='"+username+"'"
    const results = await pool.query(query)
    return results.rows[0].id
}

const  insertIntoTask = async (title,description) =>{  
    let query = "INSERT INTO task(title,description,status) VALUES('"+title+"','"+description+"','open') RETURNING *"
    const results = await pool.query(query)
    return results.rows[0].id
}

const  insertIntoTaskAppUser = async (taskId,userId) =>{
    query ="INSERT INTO task_app_user(task_id,user_id) VALUES('"+taskId+"',"+userId+")"
    await pool.query(query)
}

const getTasks = async(req, res) => {
    const userId = await getUserId(req.body.username)
    const taskId = await insertIntoTask(req.body.title,req.body.description)
    await insertIntoTaskAppUser(taskId,userId)
    res.status(200).json({msg:'task added'}).end()
}

const share = async(req, res) => {
    const userId = await getUserId(req.body.username)
    let query = "INSERT INTO task_app_user(user_id,task_id) VALUES('"+userId+"','"+req.body.taskId+"')"
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({msg:'task shared'}).end()
    })
}

const addUser =async(req, res) => { 
    let query = "INSERT INTO app_user(username,app_password) VALUES('"+req.body.username+"','"+req.body.password+"')"
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({msg:'user added'}).end()
    })
}

const getUsers =  async(req, res) => { 
    let query = "SELECT username FROM app_user";
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows).end()
    })
}

const login = (req, res) => {
    const query = "SELECT *  FROM app_user where username='"+req.body.username+"' and app_password='"+req.body.password+"'"
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        if(results.rows.length)
            res.status(200).json({'msg':'login success'}).end()
        else
        res.status(200).json({'msg':'login failed'}).end()
    })
}

module.exports = {
    getTaskByUsername,
    getTaskById,
    getUserId,
    insertIntoTask,
    insertIntoTaskAppUser,
    getTasks,
    share,
    addUser,
    getUsers,
    login
}