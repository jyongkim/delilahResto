const Order = require('../model/order')
/*  NodeJS orders handler methods */
    exports.create = function (req, res) {
        Order.create( req.params.id, req.params.pay, req.body, (err, newOrder) => (err) ? res.send(err) : res.send( {
            message: 'La orden fue cargada con éxito.',
            descripton: newOrder
        }   )
    )   }
    exports.list = function (req, res) {
        Order.list( (err, order) => (err) ? res.send(err) : res.send(order) 
    )   }
    exports.find = function (req, res) {
        Order.find( req.params.id, (err, order) => (err) ? res.send(err) : res.send(order)
    )   }
    exports.update = function (req, res){
        const state = req.body.id_state;
        Order.update(req.params.id, "id_state ="+state, (err, order) => (err) ? res.send(err) : err.send(order))
    }
    exports.delete = function(req, res){
        Order.delete(req.body, (err, order) => (err) ? res.send(err) : err.send(    {
            error: false,
            message: 'La órden ha sido eliminada exitosamente.'
        }   )
    )   }