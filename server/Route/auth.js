const express = require('express')
const authController = require('../Controller/auth')
const router = express.Router()

router.post("/register",    authController.register)
router.post("/login", authController.login)



router.get('/profile', authController.profile)

router.get('/singleUser/:id', authController.getUser)

router.get('/all-Users', authController.getUsers)

router.post('/logout', authController.logout)



router.delete('/deleteUser/:favouriteId', authController.deleteUser)

module.exports = router;