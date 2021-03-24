import express from 'express'
import Course from '../../models/Course'
import parseCourseQuery from '../../util/parseCourseQuery'

const courseRouter = express.Router()

courseRouter.get('/query', async (req, res) => {
  try {
    const { query }: { query?: string } = req.query
    if (!query) throw new Error('Query is undefined')
    const filter = parseCourseQuery(query)
    const docs = await Course.find(filter).limit(6)
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

courseRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Course.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

courseRouter.put('/:id', async (req, res) => {
  try {
    const note = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(note)
  } catch (e) {
    res.status(500).send(e)
  }
})

courseRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Course.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default courseRouter
