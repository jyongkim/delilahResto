/* Dependencias */
    const express = require(`express`)
    const swaggerJsDoc = require(`swagger-jsdoc`);
    const swaggerUi = require(`swagger-ui-express`);
/* Parametros */
    const delilah = express()
    const app = require(`./package.json`)
    const port = process.env.PORT || 5000
/* Importacion Rutas */
    const user = require(`./src/routes/user`)
    const product = require(`./src/routes/product`)
    const cart = require(`./src/routes/cart`)
    const order = require(`./src/routes/order`)
    const { login, signup } = require(`./src/middleware/auth`)
/* Configuracion API, DOC */
    delilah.use(express.urlencoded({ extended: true }))
    delilah.use(express.json())
    delilah.listen(port, () => { console.log(`El puerto utilizado es: ${port}.`) });
    const swaggerOptions = {
        swaggerDefinition: {
        info: {
            version: app.version,
            title: app.name,
            description: `Delilah Resto API REST`,
            contact: { name: app.author },
            servers: [`http://localhost:5000`]
    }   },  apis: [`index.js`]  }
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
/* Endpoints */
    delilah.get(`/`, (req, res) => { res.send( {
        tittle: app.name,
        message: `Bienvenido a ${app.name}, comienza realizando un pedido.`,
        autor: app.author,
        version: app.version,
        documentacion: `http://localhost:5000/api-docs/`
    } ) } )
    delilah.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Ruta Documentación Swagger.
    delilah.use(`/signup`, signup) // Registro de usuario.
    delilah.use(`/login`, login) // Inicio de sesión.
    delilah.use(`/users`, user) // Perfiles de usuario.
    delilah.use(`/products`, product) // Venta de productos.
    delilah.use(`/cart`, cart) // Carrito de compras.
    delilah.use(`/orders`, order) // Órdenes de compra.

/** 
    @swagger
    {
    "swagger": "2.0",
    "info": {
        "description": "This document contains the specifications to access and use Delilah-Restó's API.",
        "version": "1.0.0",
        "title": "Delilah Restó",
        "termsOfService": "http://delilahresto.com/terms/",
        "contact": {
        "email": "apiteam@delilahresto.com"
        },
        "license": {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "host": "virtserver.swaggerhub.com",
    "basePath": "/",
    "tags": [
        {
        "name":"Auth",
        "description":"JWT Token valitation"
        },
        {
        "name":"Users",
        "description": "users account management"
        },
        {
        "name": "Products",
        "description": "Products selection"
        },
        {
        "name": "Cart",
        "description": "Shopping cart Products"
        },
        {
        "name": "Orders",
        "description": "Orders selection"
        }
    ],
    "schemes": [
        "https",
        "http"
    ],
    "paths": {
        "/login": {
            "post": {
                "tags": [
                "Auth"
                ],
                "summary": "LogIn",
                "operationId": "LogIn",
                "consumes": [
                "application/x-www-form-urlencoded"
                ],
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "user",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "pass",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
            }
        }
        },
        "/signup": {
        "post": {
            "tags": [
            "Auth"
            ],
            "summary": "SignUp",
            "operationId": "SignUp",
            "consumes": [
            "application/x-www-form-urlencoded"
            ],
            "produces": [
            "application/json"
            ],
            "parameters": [
            {
                "name": "name",
                "in": "formData",
                "description": "",
                "required": true,
                "type": "string"
            },
            {
                "name": "user",
                "in": "formData",
                "description": "",
                "required": true,
                "type": "string"
            },
            {
                "name": "pass",
                "in": "formData",
                "description": "",
                "required": true,
                "type": "string"
            },
            {
                "name": "email",
                "in": "formData",
                "description": "",
                "required": true,
                "type": "string"
            },
            {
                "name": "phone",
                "in": "formData",
                "description": "",
                "required": true,
                "type": "integer",
                "format": "int32"
            },
            {
                "name": "address",
                "in": "formData",
                "description": "",
                "required": true,
                "type": "string"
            }
            ],
            "responses": {
            "200": {
                "description": "",
                "headers": {}
            }
            }
        }
        },    
        "/users": {
            "get": {
                "tags": [
                "Users"
                ],
                "summary": "List All [admin]",
                "operationId": "User.list",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            },
            "post": {
                "tags": [
                "Users"
                ],
                "summary": "Add New [admin]",
                "operationId": "AddNew[admin]",
                "consumes": [
                "application/x-www-form-urlencoded"
                ],
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "name",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "user",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "pass",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "email",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "phone",
                    "in" : "formData",
                    "required": true,
                    "type": number,
                    "format":"int64"
                },
                {
                    "name": "admin",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "boolean"
                },
                {
                    "name": "address",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            },
            "/users/{id_user}": {
            "get": {
                "tags": [
                "Users"
                ],
                "summary": "Find (:id / username / email)",
                "operationId": "User.find",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_user",
                    "in": "path",
                    "required": true,
                    "type": "number"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                }
            },
            "put": {
                "tags": [
                "Users"
                ],
                "summary": "Edit (:id / username / email)",
                "operationId": "User.update",
                "consumes": [
                "application/x-www-form-urlencoded"
                ],
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_user",
                    "in": "path",
                    "required": true,
                    "type": "number"
                },
                {
                    "name": "name",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "user",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "email",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "pass",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "phone",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "integer",
                    "format": "int64"
                },
                {
                    "name": "admin",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "boolean"
                },
                {
                    "name": "address",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            },
            "delete": {
                "tags": [
                "Users"
                ],
                "summary": "Remove (:id / username)",
                "description": "Eliminar Producto",
                "operationId": "User.delete",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_user",
                    "in": "path",
                    "required": true,
                    "type": "number"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            },
            "/products": {
            "get": {
                "tags": [
                "Products"
                ],
                "summary": "List All",
                "operationId": "Product.list",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            },
            "post": {
                "tags": [
                "Products"
                ],
                "summary": "Add New [admin]",
                "operationId": "Product.create",
                "consumes": [
                "application/x-www-form-urlencoded"
                ],
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "name",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "description",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "price",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                },
                {
                    "name": "picture",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "stock",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "boolean"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            },
            "/products/{id_product}": {
            "get": {
                "tags": [
                "Products"
                ],
                "summary": "Search (:id / prod)",
                "description": "Usuario especifico",
                "operationId": "Product.find",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_product",
                    "in": "path",
                    "required": true,
                    "type": "number"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            },
            "put": {
                "tags": [
                "Products"
                ],
                "summary": "Edit (:id / prod)[admin]",
                "operationId": "Product.update",
                "consumes": [
                "application/x-www-form-urlencoded"
                ],
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_product",
                    "in": "path",
                    "required": true,
                    "type": "number"
                },
                {
                    "name": "name",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "detail",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "price",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                },
                {
                    "name": "img",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "stock",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "boolean"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            },
            "delete": {
                "tags": [
                "Products"
                ],
                "summary": "Remove (:id / prod)[admin]",
                "operationId": "Product.delete",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_product",
                    "in": "path",
                    "required": true,
                    "type": "number"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            },
            "/cart": {
            "get": {
                "tags": [
                "Cart"
                ],
                "summary": "List Cart [admin]",
                "description": "localhost:5000/cart/",
                "operationId": "Cart.list",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            },
            "/cart/{id_user}": {
            "post": {
                "tags": [
                "Cart"
                ],
                "summary": "Add Product (:id / +prod)",
                "operationId": "Cart.create",
                "consumes": [
                "application/x-www-form-urlencoded"
                ],
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_user",
                    "in": "path",
                    "description": "",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                },
                {
                    "name": "id_product",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                },
                {
                    "name": "quantity",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            },
            "get": {
                "tags": [
                "Cart"
                ],
                "summary": "User Cart (:id / username)",
                "operationId": "Cart.find",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_user",
                    "in": "path",
                    "required": true,
                    "type": "number"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            },
            "put": {
                "tags": [
                "Cart"
                ],
                "summary": "Edit Cart (:id / +prod)",
                "operationId": "Cart.update",
                "consumes": [
                "application/x-www-form-urlencoded"
                ],
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_user",
                    "in": "path",
                    "required": true,
                    "type": "number"
                },
                {
                    "name": "id_product",
                    "in": "formData",
                    "required": true,
                    "type": "number"
                },
                {
                    "name": "quantity",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            },
            "delete": {
                "tags": [
                "Cart"
                ],
                "summary": "Rem Product (:id / +prod)",
                "operationId": "Cart.delete",
                "consumes": [
                "application/x-www-form-urlencoded"
                ],
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_user",
                    "in": "path",
                    "required": true,
                    "type": "number"
                },
                {
                    "name": "id_product",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            },
            "/orders/{id_user}": {
            "get": {
                "tags": [
                "Orders"
                ],
                "summary": "User Order (:id)",
                "operationId": "Order.list",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_user",
                    "in": "path",
                    "required": true,
                    "type": "number"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            },
            "post": {
                "tags": [
                "Orders"
                ],
                "summary": "Create Order ( +cart)",
                "operationId": "Order.create",
                "consumes": [
                "application/x-www-form-urlencoded"
                ],
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_user",
                    "in": "path",
                    "required": true,
                    "type": "number"
                },
                {
                    "name": "id_method",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            },
            "/orders": {
            "get": {
                "tags": [
                "Orders"
                ],
                "summary": "List All [admin]",
                "description": "localhost:5000/orders",
                "operationId": "Order.list",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            },
            "/orders/{id_order}": {
            "put": {
                "tags": [
                "Orders"
                ],
                "summary": "Update Order (:id +state)[admin]",
                "operationId": "Order.update",
                "consumes": [
                "application/x-www-form-urlencoded"
                ],
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_order",
                    "in": "path",
                    "required": true,
                    "type": "number"
                },
                {
                    "name": "id_state",
                    "in": "formData",
                    "description": "",
                    "required": true,
                    "type": "integer",
                    "format": "int32"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            },
            "delete": {
                "tags": [
                "Orders"
                ],
                "summary": "Delete Order (:id)[admin]",
                "operationId": "Order.delete",
                "produces": [
                "application/json"
                ],
                "parameters": [
                {
                    "name": "Authorization",
                    "in": "header",
                    "required": false,
                    "type": "string",
                    "default": "Bearer {token}"
                },
                {
                    "name": "id_order",
                    "in": "path",
                    "required": true,
                    "type": "number"
                }
                ],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            },
            "/": {
            "get": {
                "summary": "Delilah Resto",
                "operationId": "DelilahEndPoint",
                "produces": [
                "application/json"
                ],
                "parameters": [],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            },
            "/api-docs": {
            "get": {
                "summary": "Swagger",
                "operationId": "Swagger",
                "produces": [
                "application/json"
                ],
                "parameters": [],
                "responses": {
                "200": {
                    "description": "",
                    "headers": {}
                }
                },
                "deprecated": false
            }
            }
    }
    }
*/