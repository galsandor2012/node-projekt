// Házi feladat: GET, POST, PUT, DELETE
import { Router } from 'express'
import { categoryController } from '../controllers/category.js'

export const categoryRouter = Router()

categoryRouter.get('/', categoryController.GetCategories)

categoryRouter.post('/', categoryController.AddCategory)

categoryRouter.put('/:id', categoryController.UpdateCategory)

categoryRouter.delete('/:id', categoryController.DeleteCategory)