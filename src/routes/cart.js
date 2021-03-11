const express = require(`express`)
const router = express.Router()
const cartController = require(`../controller/cart`)
const { authToken, adminAuth } = require(`../middleware/auth`)
/* Cart routes */
    router.post   ( `/:id`,  authToken,  cartController.create  )  // Nuevo ítem.
    router.get    ( `/`,     adminAuth,  cartController.list    )  // Total carritos.
    router.get    ( `/:id`,  authToken,  cartController.find    )  // Carrito de usuario.
    router.put    ( `/:id`,  authToken,  cartController.update  )  // Actualizar producto.
    router.delete ( `/:id`,  authToken,  cartController.delete  )  // Remover un producto.
module.exports = router