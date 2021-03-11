const Order = require(`../model/order`)
/*  NodeJS orders handler methods */
    exports.create = function (req, res) {
        Order.create( req.params.id, req.body.id_method, (err, newOrder) => (err) ? res.send(err) : res.send( {
            message: `La orden fue cargada con éxito.`,
            description: newOrder
        }   )
    )   }
    exports.list = function (req, res) {
        Order.list( (err, order) => (err) ? res.send(err) : res.send(order) 
    )   }
    exports.find = function (req, res) {
        Order.find( req.params.id, (err, order) => (err) ? res.send(err) : res.send(order)
    )   }
    exports.update = function (req, res){
        Order.update(req.params.id, req.body.id_state, (err, order) => (err) ? res.send(err) : res.send(order))
    }
    exports.delete = function(req, res){
        Order.delete(req.params.id, (err, order) => (err) ? res.send(err) : res.send( {
            error: false,
            message: `La órden ha sido eliminada exitosamente.`,
            description: order
        }   )
    )   }