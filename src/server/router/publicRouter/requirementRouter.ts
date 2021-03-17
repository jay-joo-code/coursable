import express from 'express'
import Requirement from '../../models/Requirement'

const requirementRouter = express.Router()

requirementRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Requirement.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

requirementRouter.put('/:id', async (req, res) => {
  try {
    const note = await Requirement.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(note)
  } catch (e) {
    res.status(500).send(e)
  }
})

requirementRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Requirement.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default requirementRouter
