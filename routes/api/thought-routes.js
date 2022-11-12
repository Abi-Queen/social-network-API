const router = require('express').Router()

// import thought-controller
const {
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller')

// post thought
router
.route('/:userId')
.post(addThought)

// add reaction, delete thought
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThought)

// delete reaction
router
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction)

module.exports = router
