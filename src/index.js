import express from 'express'
import { createUser, createCategory, createCikkek } from './db.js'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { userRouter } from './routes/user.js'
import { categoryRouter } from './routes/category.js'
import { articleRouter } from './routes/article.js'

const app = express()

const port = 3000

app.use(bodyParser.json())

app.use(morgan('dev'))

app.use('/users', userRouter)

// Házi feladat: app.use('/categories', categoryRouter)
app.use('/categories', categoryRouter)



app.use('/articles', articleRouter)


///////////////////////////////////////////////////////////////////
//app.get('/hello', (req, res) => {
//  res.send('Hello World!')
//})
//
////////// Házi feladat: 1 GET, POST, PUT, PATCH, DELETE
//
//app.get('/users', async (req, res) => {
//  res.send(await getUsers())
//})
//
//app.post('/lakcim', (req, res) => {
//  res.send('Kolozsvár')
//})
//
//app.put('/szuletesihely', (req, res) => {
//  res.send('Csíkszereda')
//})
//
//app.patch('/lakcim', (req, res) => {
//  res.send('Budapest')
//})
//
//app.delete('/lakcim', (req, res) => {
//  res.send('Budapest')
//})
///////////////////////////////////////////////////////////////////



app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen`)
  createUser()
  //deleteUsers()
  //addUser()
  createCategory()
  //addCategory()
  createCikkek()
})