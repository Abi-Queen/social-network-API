const router = require('express').Router()

/// import from user-controller
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller')

// get all users, create new user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

// get, update, delete user by id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

// update, delete friends
router
.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router
