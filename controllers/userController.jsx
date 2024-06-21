const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser, listUsers, deleteUserById, updateUser} = require('../models/userModel.jsx')

const register = async (req,res) => {
    const { name, email, password} = req.body;

    const userExist = await findUserByEmail(email)
   
    if (userExist) {
        return res.status(200).json({message:'Usuário já cadastrado no sistema', userExist})
    } else {
        const hashedPassword = bcrypt.hashSync(password,10)
        const user = await createUser(name, email, hashedPassword);
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' })
    }

}

const login = async (req,res) =>{
    const {email, password} = req.body

    const user = await findUserByEmail(email)
    
        if(user){
            
            const isMatch = await bcrypt.compare(password,user.password)
            console.log(isMatch)
            if(isMatch){
                res.json({message:'Usuário Logado com Sucesso',user})
        
            }else{
                res.status(200).json('Senha inválida')
            }
        } else{
            res.status(200).send('Usuário Não Encontrado')
        }
}

const list = async (req, res) => {
    try {
        const users = await listUsers();
      
        return res.json({ users: users.rows });
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const deleteUser = async (req,res) => {
    const id = req.body.id
    console.log(id)
    try {
        const user = await deleteUserById(id);
        return res.json({message:'Usuario deletado' });

    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

const buscar = async (req,res) =>{
    console.log(req.body)

    const email = req.body.email
   
    const user = await findUserByEmail(email)
   
        if(user){
            console.log(user)
            return res.json({message: 'Usuario Encontrado', user})       
        }else{
            return res.json({message:'Usuário Não Encontrado'})
        }     
}


const update = async (req,res) => {
    const {id, name,email,password,admin,status } = req.body;
    console.log(req.body)

    try {

        const userExist = await findUserByEmail(email);
        //console.log(userExist)
        if (userExist) {
            
            const update = await updateUser(id, name,email,password,admin,status)
            
            if(update){
            
                res.json({message: 'Cadastro Atualizado com Sucesso!',update})
            } else {
                res.json({message: 'Erro ao Atualizar o Cadastro!'})
 
            }
        }
        else{
            return res.json({message: 'Usuário não encontrado'})    
        }


    } catch (error) {
        console.error('Erro ao Atualizar o Cadastro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};



module.exports = {
    register,
    login,
    list,
    deleteUser,
    buscar,
    update
}