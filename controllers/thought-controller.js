//import models
const { Thought, User } = require('../models')

// find all thoughts
const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
    .then((data) => {
      res.json(data)
    })
    .catch(error => {
      res.status(400).json(error)
    })
  },

  //find thought by id
  findOneThought(req, res) {
    Thought.findById(req.params.thoughtId)
    .then((data) => {
      res.json(data)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  },
  
  // add thought to user
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findByIdAndUpdate(
          { _id: params.user.id },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' })
          return
        } 
        res.json(dbUserData)
      })
      .catch(err => res.json(err))
  },

  // remove thought
  removeThought({ params }, res) {
    Thought.findByIdAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought found with this id.' })
        }
        return User.findByIdAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' })
          return;
        }
        res.json(dbUserData)
      })
      .catch(err => res.json(err))
  },

  // add reactions
  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      {new: true}
    )
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then((dbThoughtData) => {
      if(!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id.' })
        return
      }
      res.json(dbThoughtData)
    })
    .catch((err) => res.json(err))
  }, 

  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: params.reactionId } },
      { new: true }
    )
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err))
  }
}

//export controller
module.exports = thoughtController
