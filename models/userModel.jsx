const pool = require('../database/db_connection.jsx')

const findUserByEmail = async (email) => {
    console.log(email)
    const dados = await pool.query("SELECT * FROM USERS WHERE EMAIL = $1", [email]);
    return dados.rows[0];
};



const createUser= async (name, email, hash) =>{
const result = await pool.query(
    'INSERT INTO USERS (NAME, EMAIL, PASSWORD, IS_ADMIN, STATUS) VALUES ($1, $2, $3, FALSE, TRUE) RETURNING *',
    [name, email, hash]
  );
  return result.rows[0];
};

const listUsers = async () =>{
    const users = await pool.query("SELECT * FROM USERS")
    return users
}


const deleteUserById = async (id) => {

    const status = await pool.query('UPDATE USERS SET STATUS = FALSE WHERE ID=$1',[id])
    return status.command
}

const updateUser = async (id, name,email,password,admin,status)=>{
    const result = await pool.query(
        'UPDATE USERS SET NAME = $1,EMAIL = $2, PASSWORD = $3, IS_ADMIN = $4, STATUS = $5 WHERE ID = $6',[name,email,password,admin,status,id ]
    )
   
    return (result.command)



}

const deleteRegisterModel = async(id) =>{
    const result = await pool.query(
        'DELETE FROM USERS WHERE ID = $1',[id ]
    )
    return (result.command)
}


module.exports = {
    findUserByEmail,
    createUser,
    listUsers,
    deleteUserById,
    updateUser,
    deleteRegisterModel
}