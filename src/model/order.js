let dbConn = require(`../middleware/dbConn`);
/*  Detail model constructor */
    let Order = function(order) {
        this.id_product =  order.id_product
        this.quantity   =  order.quantity
        this.price      =  order.price
    }
/*  MySQL betail methods (query, params, callback) */
    Order.create = (id, method, result) => {
        /* Order Creation */
        dbConn.query(`INSERT INTO orders(id_user, id_method, price)
            VALUES ( ?, ?, ( SELECT SUM(quantity * price) 
            FROM cart WHERE id_user = ? ) )`, 
            [ id, method, id ] )  
        /* Cart Products Insertion */
        dbConn.query(`INSERT INTO orders_detail(id_order, id_product, quantity, price)
            SELECT id_order, id_product, quantity, c.price FROM cart AS c
            JOIN orders AS o ON o.id_user = c.id_user WHERE o.id_user = ?`, id )
        /* Empty Shopping Cart */
        dbConn.query(`DELETE FROM cart WHERE id_user = ?`,
            id, (err, res) => err ? result(err, null) : result(null, res)
    )   }   
    Order.list = (result) => {
        dbConn.query(`SELECT * FROM orders AS o 
            JOIN orders_detail AS od 
            ON od.id_order = o.id_order
            ORDER BY o.id_order DESC`, 
        (err, res) => (err) ? result(null, err) : result(null, res)
    )   } 
    Order.find = (id, result) => {
        dbConn.query(`SELECT * FROM orders AS o 
            JOIN orders_detail AS od 
            ON od.id_order = o.id_order 
            WHERE id_user = ? 
            ORDER BY o.id_order, od.id_detail DESC`, 
            id, (err, res) => (err) ? result(err, null) : result(null, res)
    )   }
    Order.update = (id, detail, result) => {
        dbConn.query(`UPDATE orders SET id_state = ? 
            WHERE id_order = ?`, 
            [ detail, id ], (err, res) => (err) ? result(err, null) : result(null, res)
    )   }
    Order.delete = (id, result) => {
        dbConn.query(`DELETE od FROM orders_detail od 
            JOIN orders o ON od.id_order = o.id_order 
            WHERE o.id_order = ?`, 
            id, (err, res) => err ? result(err,null) : result(null, res) 
    )   }
module.exports = Order;