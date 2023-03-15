const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// all users
router.route('/').get(getUsers).post(createUser);

// example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }

// /api/users/:userId
router.route('/:userId').get(getSingleUser)
// as well as populated thought and friend data
// .put(updateUser)
.delete(deleteUser) // attempt to delete associated thoughts (presumably cascading to reactions)

// friends routes: /api/:userId/friends/:friendId

// router.route('/:userId/friends/:friendId')
// .post(addFriend)
// .delete(removeFriend)

module.exports = router;
