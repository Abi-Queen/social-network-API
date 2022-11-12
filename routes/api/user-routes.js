const router = require('express').Router()

/// import from user-controller
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller')

// get all users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

// get users by id
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
