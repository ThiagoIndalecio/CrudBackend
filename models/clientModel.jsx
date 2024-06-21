const pool = require('../database/db_connection.jsx')

const findClientByCpf = async (cpf, email) => {
    const dados = await pool.query("SELECT * FROM CLIENTS WHERE CLI_CPF = $1 OR CLI_EMAIL = $2" , [cpf,email]);
    console.log(dados.rows[0]);
    return dados.rows[0];
    
};

const createClient = async (name, email, cpf, phone) => {
    const result = await pool.query(
        'INSERT INTO CLIENTS (CLI_NAME, CLI_EMAIL, CLI_CPF, CLI_PHONE, CLI_STATUS) VALUES ($1, $2, $3, $4, TRUE) RETURNING *',
        [name, email, cpf, phone]
    );
    return result.rows[0];
};


const updateClient = async (name, email,phone,status,id,) =>{
    const result = await pool.query(
        'UPDATE CLIENTS SET CLI_NAME = $1,CLI_EMAIL = $2, CLI_PHONE = $3, CLI_STATUS = $4 WHERE ID = $5',[name,email,phone,status,id ]
    )
    return (result.command)


}
const findClientByCpforEmail = async (info) => {
    const dados = await pool.query("SELECT * FROM CLIENTS WHERE (CLI_CPF = $1 OR CLI_EMAIL = $1)" , [info]);
    return dados.rows[0];
    
};

const deleteClient = async (id) =>{

    const deleteClient = await pool.query("UPDATE CLIENTS SET CLI_STATUS = FALSE WHERE ID = $1",[id])
    return(deleteClient)
}

const listClients = async () =>{
    const clients = await pool.query("SELECT * FROM CLIENTS WHERE CLI_STATUS = TRUE")
    return clients
}

module.exports = {
    findClientByCpf,
    createClient,
    updateClient,
    findClientByCpforEmail,
    deleteClient,
    listClients
}