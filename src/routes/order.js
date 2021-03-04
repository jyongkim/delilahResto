const express = require('express')
const router = express.Router()
const orderController = require('../controller/order')
const { authToken, adminAuth } = require('../middleware/auth')
/* Cart routes */
    router.post   (  '/',     authToken,  orderController.create  )  // Nuevo ítem.
    router.get    (  '/',     adminAuth,  orderController.list    )  // Total carritos.
    router.get    (  '/:id',  authToken,  orderController.find    )  // Carrito de usuario.
    router.put    (  '/:id',  authToken,  orderController.update  )  // Actualizar producto.
    router.delete (  '/:id',  authToken,  orderController.delete  )  // Remover un producto.
module.exports = router