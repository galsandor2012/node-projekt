// Házi feladat: GetCategory, AddCategory, UpdateCategory, DeleteCategory
import { getCategories, addCategory, updateCategory, deleteCategory } from '../db.js'
import Joi from 'joi'

const addRule = Joi.object({
  id: Joi.number().required(),
  nev: Joi.string().required().min(3)
})

async function GetCategories(req, res) {
    res.send(await getCategories())
}

async function AddCategory(req, res) {
try {
  const { id, nev } = await addRule.validateAsync(req.body)
  await addCategory(id, nev)
  res.send('Megérkezett a válasz!')
} catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateCategory(req, res) {
try {
  const { id, nev } = await addRule.validateAsync(req.body)
  res.send(await updateCategory(id, nev))
  } catch (error) {
  res.status(400).send(error)
  }
}

//  async function UpdateCategory(req, res) {
//    const { id } = req.params
//    const { nev } = req.body
//    res.send(await updateCategory(id, nev))
//  }

async function DeleteCategory(req, res) {
  const { id } = req.params
  res.send(await deleteCategory(id))
}

export const categoryController = {
  GetCategories,
  AddCategory,
  UpdateCategory,
  DeleteCategory
}