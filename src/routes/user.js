const express = require(`express`)
const router = express.Router()
const userController = require(`../controller/user`)
const { authToken, adminAuth } = require(`../middleware/auth`)
/* User routes */
    router.post   ( `/`,     adminAuth,  userController.create  ) // C
    router.get    ( `/`,     adminAuth,  userController.list    ) // R
    router.get    ( `/:id`,  authToken,  userController.find    ) // R
    router.put    ( `/:id`,  authToken,  userController.update  ) // U
    router.delete ( `/:id`,  authToken,  userController.delete  ) // D
module.exports = router

