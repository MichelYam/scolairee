const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const tokenValidation = require('../middleware/tokenValidation')
// const authorize = require("../middleware/role")
// const Role = require('../models/User');


router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser)

router.post(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserProfile
)

router.put(
  '/profile',
  tokenValidation.validateToken,
  userController.updateUserProfile
)

router.get(
  '/users',
  // tokenValidation.validateToken,
  // authorize(Role.Admin),
  userController.getAllUsers
)

router.get(
  '/friends',
  tokenValidation.validateToken,
  userController.getFriendList
)

router.delete(
  "/delete/:id",
  userController.deleteUser
)

//notfications friend request
router.post(
  '/sendfriendrequest',
  tokenValidation.validateToken,
  userController.sendFriendRequest
)

router.put(
  '/acceptFriendRequest',
  tokenValidation.validateToken,
  userController.acceptFriendRequest
)

router.get(
  '/getfriendrequest',
  tokenValidation.validateToken,
  userController.getFriendRequest
)

router.delete(
  "/rejectFriendRequest/:id",
  // tokenValidation.validateToken,
  userController.rejectFriendRequest
)


module.exports = router
