/* Import database connection */
    let dbConn = require(`../middleware/dbConn`);
/*  User model constructor */
    let User = function(user) {
        this.name = user.name
        this.user = user.user
        this.email = user.email
        this.pass = user.pass
        this.phone = user.phone
        this.address = user.address
        this.admin = user.admin ? user.admin : false
    }
/*  MySQL user methods (query, params, callback) */
    User.create = (newUser, result) => {
        dbConn.query(`INSERT INTO Users SET ?`, 
        newUser, (err, res) => (err) ? result(err, null) : result(null, res)
    )   }
    User.list = (result) => {
        dbConn.query(`SELECT * FROM Users`, 
        (err, res)=> (err) ? result(null, err) : result(null, res)
    )   }
    User.login = (user, pass, result) => {
        dbConn.query(`SELECT * FROM users 
            WHERE user = ? AND pass = ?`,
        [ user, pass ], (err, res) => (err) ? result(err, null) : result(null, res)
    )   }
    User.find = (id, result) => {
        dbConn.query(`SELECT * FROM Users 
            WHERE id_user = ? OR user = ?`, 
        [ id, id ], (err, res) => (err) ? result(err, null) : result(null, res)
    )   }
    User.update = (id, user, result) => {
        dbConn.query(`UPDATE Users SET ? 
            WHERE id_user = ?`, 
        [ user, id ], (err, res) => (err) ? result(err, null) : result(null, res)
    )   }
    User.delete = (id, result) => {
        dbConn.query(`DELETE FROM Users 
            WHERE id_user = ? OR user = ?`, 
        [ id, id ], (err, res) => (err) ? result(null, err) : result(null, res)
    )   }
/* export User model */
    module.exports  = User