//import models
const { Thought, User } = require('../models')

// find all thoughts
const thoughtController = {
  findThoughts(req, res) {
    Thought.find()
    .then((data) => {
      res.json(data)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  },

  //find thought by id
  findOneThought(req, res) {
    Thought.findById(req.params.userId)
    .then((data) => {
      res.json(data)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  },
  
  // add thought to user
  addThought({ params, body }, res) {
    console.log(params);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        console.log(dbUserData)
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' })
          return;
        }
        res.json(dbUserData)
      })
      .catch(err => res.json(err))
  },

  // add reaction to thought
  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
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
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id.' })
        }
        return User.findOneAndUpdate(
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
  addReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.id },
      { $push: { reactions: params.reactionId } },
      {new: true}
    )
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then((thought) => {
      if(!thought) {
        res.status(404).json({ message: 'No thought found with this id.' })
        return
      }
      res.json(thought)
    })
    .catch((err) => res.json(err))
  }, 

  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.id },
      { $pull: { reactions: params.reactionId } },
      { new: true }
    )
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then((thought) => res.json(thought))
    .catch((err) => res.json(err))
  }
}

//export controller
module.exports = thoughtController
