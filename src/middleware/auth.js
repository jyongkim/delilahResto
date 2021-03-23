const jwt = require(`jsonwebtoken`);
const secret = `hola123`;
const User = require(`../model/user`)
let log = []
/*  JWT token creation */
    exports.signup = (req, res) => {
        const userToken = new User(req.body);
        User.create( userToken, (err, user) => { 
            ( err ) ? res.send(err) : jwt.sign( {userToken}, secret,{expiresIn: `24h`}, (err, token) => { 
                res.json( token ) 
            }   )   
    }   )   }
    exports.login = (req, res) =>{
        User.login( req.body.user, req.body.pass,(err, userToken) => {
            ( userToken[0] ) ? jwt.sign( { userToken }, secret, {expiresIn: `24h`}, (err, token) =>  { 
                res.json( token ) 
            } ) : res.status(404).send({
                error: 404,
                message: `Usuario y/o contraseña incorrectos.`
            }   )
    }   )   }  
/*  JWT validation access */
    exports.auth = (req, res, next) =>{
        const bearer = req.headers[`authorization`]
        if(typeof bearer !== `undefined`) { 
            const token   = bearer.split(` `)[1]; 
            const decoded = jwt.verify(token, secret);
            req.token     = token;
            next()
        } else {
            accessDenied()
        }
    }
    exports.authToken = (req, res, next) => {
        const bearer = req.headers[`authorization`]
        if(typeof bearer !== `undefined`) { 
            const token   = bearer.split(` `)[1]; 
            const decoded = jwt.verify(token, secret);
            req.token     = token;
            req.decoded   = decoded;
                log.admin = decoded.userToken[0].admin || false;
                log.id    = decoded.userToken[0].id_user;
                log.name  = decoded.userToken[0].user;
            ( log.admin == true || log.id == req.params.id || log.name == req.params.id ) ? 
                next() : res.json(   {
                    error:403,
                    message: `Acceso restringido, sólo administradores y propietarios.`
                }   )
        } else {
            accessDenied()
        }   }
    exports.adminAuth = (req, res, next) => {
        const bearer = req.headers[`authorization`]
        if(typeof bearer !== `undefined`) { 
            const token = bearer.split(` `)[1];
            const decoded = jwt.verify(token, secret);
            req.token = token;
            req.decoded = decoded;
                log.admin = decoded.userToken[0].admin || false;
                log.id    = decoded.userToken[0].id_user;
                log.name  = decoded.userToken[0].user;
            ( log.admin == true ) ?
                next() : res.json(   {
                    error:403,
                    message: `Acceso restringido. Sólo pueden ingresar administradores.`
                }   )
        } else {
            accessDenied()
    }   }

    accessDenied = () => {
        res.json(   {
            error: 403, 
            message: `Acceso no autorizado. Debes iniciar sesión.`
        }   ) 
    }