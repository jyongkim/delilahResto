const express = require(`express`)
const router = express.Router()
const orderController = require(`../controller/order`)
const { authToken, adminAuth } = require(`../middleware/auth`)
/* Orders routes */
    router.post   ( `/:id`,  authToken,  orderController.create  )  // Nueva Orden de Usuario.
    router.get    ( `/`,     adminAuth,  orderController.list    )  // Total Ordenes de Compra.
    router.get    ( `/:id`,  authToken,  orderController.find    )  // Ordenes del Usuario.
    router.put    ( `/:id`,  adminAuth,  orderController.update  )  // Actualizar Estado de Orden.
    router.delete ( `/:id`,  adminAuth,  orderController.delete  )  // Eliminar Orden de Compra.
module.exports = router