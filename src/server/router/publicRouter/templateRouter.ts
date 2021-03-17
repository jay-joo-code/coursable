import express from 'express'
import Template from '../../models/Template'

const templateRouter = express.Router()

templateRouter.get('/major/:majorId', async (req, res) => {
  try {
    const doc = await Template.findOne({ majorId: req.params.majorId })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

templateRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Template.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

templateRouter.put('/:id', async (req, res) => {
  try {
    const note = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(note)
  } catch (e) {
    res.status(500).send(e)
  }
})

templateRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Template.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default templateRouter
