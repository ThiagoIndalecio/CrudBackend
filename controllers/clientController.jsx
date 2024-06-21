const { findClientByCpf, createClient, updateClient, findClientByCpforEmail, deleteClient, listClients } = require('../models/clientModel.jsx');

const register = async (req, res) => {
    const { name, email, phone, cpf } = req.body;

    try {

        const userExist = await findClientByCpf(cpf);
        console.log(userExist)
        if (userExist) {
                
            return res.json({message: 'Usuário já cadastrado',userExist})
        }
        else {
            const client = await createClient(name, email, cpf, phone);

            if (client) {
                return res.status(201).json({ message: 'Cliente cadastrado com sucesso!', client });
            } else {
                return res.status(400).json({ message: 'Erro ao cadastrar o cliente' });
            }
        }


    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


const alterar = async (req,res) => {
    const { name,email,phone,cpf,status,id } = req.body;
    console.log(req.body)
    try {

        const userExist = await findClientByCpf(cpf);
        
        if (userExist) {
            
            const update = await updateClient(name,email,phone,status,id)
            
            if(update){
                return res.json({message: 'Cadastro Atualizado com Sucesso!',update})
            } else{
                return res.json({message: 'Erro ao Atualizar o Cadastro!'})
 
            }
        }
        else{
            return res.json({message: 'Cliente não encontrado'})    
        }


    } catch (error) {
        console.error('Erro ao Atualizar o Cadastro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


const buscar = async (req,res) =>{
    const info = req.body.cliInfo
   
    const client = await findClientByCpforEmail(info)
   
        if(client){
            return res.json({message: 'Cleinte Encontrado', client})       
        }else{
            return res.json({message:'Cliente Não Encontrado'})
        }     
}


const deleteClientById = async (req,res) =>{
    
    
    const id = req.body.data.id

    const result = await deleteClient(id)
    console.log(result)
    if (result){
        return res.json({message: 'Cliente Deletado', result})       
    }else{
        console.log(req.boy)
        return res.json({message:'Erro ao deletar Cliente'})
    }
}

const list = async (req, res) => {
    try {
        const clients = await listClients();
        console.log(clients.rows);
        return res.json({ clients: clients.rows });
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};






module.exports = {
    register,
    alterar,
    buscar,
    deleteClientById,
    list
};
