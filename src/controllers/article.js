import { getCikkek, addCikkek, updateCikkek, deleteCikkek } from '../db.js'
import Joi from 'joi'

const addRule = Joi.object({
  cikkCim: Joi.string().required().min(3),
  szerzoID: Joi.number().required(),
  szoveg: Joi.string().required().min(5).max(100)
})

async function GetArticle(req, res) {
  res.send(await getCikkek())
}

async function AddArticle(req, res) {
try {
  const { cikkCim, szerzoID, szoveg } = await addRule.validateAsync(req.body)
  await addCikkek(cikkCim, szerzoID, szoveg)
  res.send('Létrehoztam cikket!')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateArticle(req, res) {
try {
  const { cikkCim, cikkID } = await addRule.validateAsync(req.body)
  await updateCikkek(cikkCim, cikkID)
  res.send('Frissítettem a cikket!')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteArticle(req, res) {
  const { cikkID } = req.body
  await deleteCikkek(cikkID)
  res.send('Kitöröltem a cikket!')
}

export const articleController = {
  GetArticle,
  AddArticle,
  UpdateArticle,
  DeleteArticle
}