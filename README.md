# Delilah Restó API REST (Backend).
Tercer proyecto de Acámica.

## Tecnologías utilizadas
- Node.js
- Express
- MySQL
- JWT
- Postman
- Swagger

## Instalación

### 1) Clonar el repositorio.
Para instalar la aplicación: descargar o clonar el repostorio desde el siguiente link `https://github.com/jyongkim/delilahResto`. 

### 2) Instalación de dependencias.
Una vez descargada la aplicación, abrir la consola y ejecutar el comando "npm i". En caso de que haya un error, revisar las correciones emitidas por la consola y emitir los comandos pertinentes; e.g. "npm fund" o "npm audit fix".

### 3) Creación de la base de datos.
- Instalar XAMPP y ejecutar el servicio MySQL.
- Abrir MySQL Workbench.
- Ejecutar el script que se encuentra en la ruta src/middleware/dbConfig.sql

### 4) Ejecución del servidor.
Abrir la carpeta en la consola y ejecutar el comando "npm start" o "node index.js". Luego, abrir el navegador y escribir la siguiente dirección: `https://localhost:5000/`

### 5) Uso general de la aplicación.
- Iniciar sesión o registrarse para generar un token.
- Copiar el token generado y utilizarlo para acceder a las diferentes funciones de la aplicación.
- Sección de usuarios:
    El usuario sólo puede acceder a su perfil identificándolo por su ID, lo puede editar e incluso eliminar.
    Sólo los administradores pueden ver todos los perfiles.
- Sección de productos:
    El usuario puede ver el total de cada producto e incluso filtrarlos.
    Los administradores pueden agregar, editar y eliminar productos.
- Sección carrito:
    El usuario puede agregar productos, modificar la cantidad de los mismos y eliminarlos de su carrito siempre y cuando el ID del perfil coincida con el de su token.
    El administrador puede ver todos los carritos y manipularlos.
- Sección órdenes:
    El usuario puede generar una nueva orden identificándose con su ID y seleccionando un medio de pago. Luego, se moverá el contenido del carrito a la tabla orders y orders_detail.
    El administrador puede cambiar el estado de la orden, generar órdenes nuevas, listarlas y eliminarlas. Comenzando con el detalle y siguiendo con la orden.
