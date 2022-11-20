const router = require('express').Router()

// import thought-controller
const {
  findThoughts,
  findOneThought,
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller')

//find all thoughts
router.route('/').get(findThoughts)

// post thought
router
.route('/:userId').get(findOneThought).post(addThought)

// add reaction, delete thought, delete reaction
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThought)
  .delete(deleteReaction)

module.exports = router
