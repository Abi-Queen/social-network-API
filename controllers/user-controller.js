const { User } = require('../models')

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      // .populate({
      //   path: 'thought',
      //   select: '-__v'
      // })
      // .populate({
      //   path: 'friends',
      //   select: '-__v'
      // })
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate('thoughts')
    //   .populate({
    //     path: 'friends',
    //     select: '-__v'
    //   })
      // .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err))
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true
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

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err))
  },

  // add friend
  addFriend({ params }, res) {
    User.findOneandUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
    .populate({ path: 'friends',  select: '-__v' })
    .select('-__v')
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(user)
    })
    .catch((err) => res.json(err))
  },

  // delete friend
  deleteFriend({ params }, res) {
    User.findByIdAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friend.Id } },
      { new: true}
    )
    .populate({ path: 'friends', select: '-__v' })
    .select('-__v')
    .then((user) => res.json(user))
    .catch((err) => res.json(err))
  }
}


module.exports = userController;
