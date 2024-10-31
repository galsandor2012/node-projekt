import { getUsers, addUser, updateUser, deleteUser } from '../db.js'
import Joi from 'joi'

const addRule = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'hu', 'ro', 'eu'] } }),
  nev: Joi.string().required().min(3),
  id: Joi.number().required()
})

async function GetUsers(req, res) {
    res.send(await getUsers())
}

async function AddUser(req, res) {
    //const user = req.body
    //await addUser(user.nev, user.email)
try {
  const { email, nev} = await addRule.validateAsync(req.body) // email, nev
  await addUser(nev, email)
  res.send('Megérkezett a válasz!')
  } catch (error) {
    res.status(400).send(error)
  } 
}

async function UpdateUser(req, res) {
try {
  const { id, email, nev } = await addRule.validateAsync(req.body)
  res.send(await updateUser(id, nev, email))
  } catch (error) {
    res.status(400).send(error)
  }
}

//  async function UpdateUser(req, res) {
//    const { id } = req.params
//    const { email, nev } = req.body // email, nev
//    res.send(await updateUser(id, nev, email))
//  }

async function DeleteUser(req, res) {
  const { id } = req.params
  res.send(await deleteUser(id))
}
  
export const userController = {
    GetUsers,
    AddUser,
    UpdateUser,
    DeleteUser
}