const router = require('express').Router()

// import functions from thought-controller
const {
  getAllThoughts,
  findOneThought,
  addThought,
  removeThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller')

//find all thoughts
router.route('/')
.get(getAllThoughts)
.post(addThought)

// find one, update delete thought by id, add or remove reactions
router
.route('/:thoughtId')
.get(findOneThought)
.delete(removeThought)
.put(addReaction)
.delete(deleteReaction) 

module.exports = router
