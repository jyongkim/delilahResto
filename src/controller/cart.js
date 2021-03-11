const Cart = require(`../model/cart`)
/*  NodeJS cart handler methods */
    exports.create = function(req, res) {
        const newCart = new Cart(req.body)
        Cart.create(req.params.id, newCart, (err, cart) => err ? res.send(err) : res.json( {
            error : false,
            message : `Producto agregado al carrito.`,
            cart : cart
        }   )
    )   }
    exports.list = function(req, res) {
        Cart.list((err, user) => { (err) ? res.send(err) : res.send(user) }
    )   }
    exports.find = function(req, res) {
        Cart.find(req.params.id, (err, user) => (err) ? res.send(err) : res.json(user)
    )   }
    exports.update = function(req, res) {
        Cart.update(req.params.id, req.body, (err, cart) => err ? res.send(err) : res.json( {
                error : false,
                message : `Carrito actualizado exitosamente.`,
                cart : cart
            }   )
    )   }
    exports.delete = function(req, res) {
        Cart.delete(req.params.id, req.body.id_product, (err, cart) => (err) ? res.send(err) : res.json(   {
            error:false, 
            message:`El producto fue eliminado del carrito.`,
            user: cart
        }   )
    )   }