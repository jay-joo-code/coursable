import express from 'express'
import Major from '../../models/Major'

const majorRouter = express.Router()

majorRouter.get('/', async (req, res) => {
  try {
    const docs = await Major.find(req.query)
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

majorRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Major.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default majorRouter
