DROP DATABASE IF EXISTS Delilah;
CREATE DATABASE IF NOT EXISTS Delilah;
USE Delilah;

/* Data definition language */
    CREATE TABLE IF NOT EXISTS Users (
        id_user INT AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        user VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        pass VARCHAR(20) NOT NULL,
        phone int(10) NOT NULL,
        address VARCHAR(200) NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        admin BOOLEAN DEFAULT FALSE,
        PRIMARY KEY(id_user),
        UNIQUE KEY(user),
        UNIQUE KEY(email)
    );
    CREATE TABLE IF NOT EXISTS products (
        id_product INT AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        detail VARCHAR(200),
        price decimal(8,2) NOT NULL,
        stock INT,
        img VARCHAR(200),
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id_product),
        UNIQUE KEY(name)
    );
    CREATE TABLE IF NOT EXISTS states (
        id_state INT AUTO_INCREMENT,
        detail VARCHAR(50),
        PRIMARY KEY(id_state),
        UNIQUE KEY(detail)
    );
    CREATE TABLE IF NOT EXISTS pay_method (
        id_method INT AUTO_INCREMENT,
        detail VARCHAR(50),
        PRIMARY KEY(id_method),
        UNIQUE KEY(detail)
    );
    CREATE TABLE IF NOT EXISTS cart (
        id_cart INT AUTO_INCREMENT,
        id_user INT NOT NULL,
        id_product INT NOT NULL,
        quantity INT,
        price DECIMAL(10,2),
        PRIMARY KEY(id_cart),
        UNIQUE KEY(id_user, id_product),
        FOREIGN KEY(id_user) REFERENCES Users(id_user),
        FOREIGN KEY(id_product) REFERENCES products(id_product)
    );
    CREATE TABLE IF NOT EXISTS orders (
        id_order INT AUTO_INCREMENT,
        id_user INT NOT NULL,
        id_state INT NOT NULL DEFAULT 1, 
        id_method INT NOT NULL DEFAULT 1,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        price decimal(8,2) NOT NULL,
        pago BOOLEAN DEFAULT FALSE,
        PRIMARY KEY(id_order),
        FOREIGN KEY(id_user) REFERENCES Users(id_user),
        FOREIGN KEY(id_state) REFERENCES states(id_state),
        FOREIGN KEY(id_method) REFERENCES pay_method(id_method)
    );
    CREATE TABLE IF NOT EXISTS orders_detail (
        id_detail INT AUTO_INCREMENT,
        id_order INT,
        id_product INT,
        quantity INT,
        price decimal(8,2) NOT NULL,
        PRIMARY KEY(id_detail),
        UNIQUE KEY(id_order, id_product),
        FOREIGN KEY(id_order) REFERENCES orders(id_order),
        FOREIGN KEY(id_product) REFERENCES products(id_product)
    );
/* Data manipulation language */
	-- Estados de orden.
    INSERT INTO states (detail)
	VALUES ('NUEVO'), ('CONFIRMADO'), ('PREPARANDO'), ('ENVIADO'), ('CANCELADO'), ('ENTREGADO');
	-- Metodos de pago.
	INSERT INTO pay_method(detail)
	VALUES ('EFECTIVO'), ('CREDITO'), ('DEBITO'), ('TRANSF.B'), ('VIRTUAL');
	-- Registro usuarios.
    INSERT INTO Users(user, name, email, pass, admin)
	VALUES
		("freddi_mercury", "Farrokh Bulsara", "freddimercury@gmail.com", "queen", false),
		("jonathan_kim","Jonathan Kim", "jonathankim@gmail.com", "jonathan", true),
		("kurt_cobain", "Kurt Cobain", "kurtcobain@gmail.com", "nirvana1", false),
		("krist_novoselic","Krist Novoselic", "krist@gmail.com", "nirvana2", true),
		("dave_grohl", "Dave Grohl", "davegrohl@gmail.com", "nirvana3", false),
		("dark_kim","Dark Kim", "darkkim@gmail.com", "dark", true);
	-- Registro de productos.
    INSERT INTO products(name, stock, price, img)
    VALUES
        ('Hamburgesa clásica', 1, 250, 'https://image.freepik.com/free-photo/front-view-burger-fries-plate_23-2148784444.jpg'),
		('Bagel de salmón', 1, 420, 'https://image.freepik.com/free-photo/smoked-salmon-bagel-sandwich_1147-546.jpg'),
		('Ensalada veggie', 0, 340, 'https://image.freepik.com/free-photo/salad-white-plate_1303-9609.jpg'),
		('Focaccia', 1, 300, 'https://image.freepik.com/free-photo/italian-focaccia-with-tomatoes-peppers-onions_2829-4883.jpg'),
		('Sandwich focaccia', 0, 440, 'https://image.freepik.com/free-photo/arabic-kebab-sandwich-with-focaccia-bread_23-2148651091.jpg'),
		('Ensalada Caesar', 0, 320, 'https://image.freepik.com/free-photo/chicken-caesar-salad-blue-picnic-table_1147-551.jpg'),
		('Hamburguesa de lentejas', 1, 380, 'https://as2.ftcdn.net/jpg/02/10/01/09/500_F_210010913_kSQ6PbyL5EFVaZqc4gFbN4AgnaUquBjV.jpg'),
		('Ensalada de atún', 0, 305, 'https://img.freepik.com/free-photo/seared-tuna-steak-with-green-beans-cherry-tomatoes_1147-575.jpg?size=626&ext=jpg'),
		('Tarta de jamón y queso', 1, 380, 'https://img.freepik.com/free-photo/woman-with-tattoos-fingers-breaks-up-ready-eat-croissant-with-melted-cheese-ham_346278-112.jpg?size=626&ext=jpg'),
		('Tarta integral de verdura', 0, 380, 'https://img.freepik.com/free-photo/delicious-pumpkin-pie-top-view_23-2148656363.jpg?size=626&ext=jpg'),
		('Empanada de jamón y queso', 1, 100, 'https://img.freepik.com/free-photo/baked-pies-dish_1205-174.jpg?size=626&ext=jpg'),
		('Empanada de carne', 1, 100, 'https://img.freepik.com/free-photo/chicken-pie-kurnik-that-is-beautifully-decorated-table_1150-23098.jpg?size=626&ext=jpg'),
		('Empanada de verdura', 1, 100, 'https://img.freepik.com/free-photo/chicken-pie-kurnik-that-is-beautifully-decorated-table_1150-23094.jpg?size=338&ext=jpg'),
		('Wrap de verdura', 0, 210, 'https://img.freepik.com/free-photo/tortilla-with-added-ink-cuttlefish-with-chicken-vegetables_2829-10963.jpg?size=626&ext=jpg'),
		('Wrap de pollo y verdura', 0, 270, 'https://t3.ftcdn.net/jpg/00/84/80/64/240_F_84806475_KlovxBiUwxR74oohIASmlAR0JdGLAZIK.jpg'),
		('Wrap integral de atún', 0, 330, 'https://img.freepik.com/free-photo/pita-stuffed-with-chicken-peppers_2829-17827.jpg?size=626&ext=jpg');
        -- Carritos de compras.
        INSERT INTO cart(id_user, id_product, quantity)
        VALUES
            (1,2,9), (1,4,5), (1,3,5), (1,5,1),
            (2,2,6), (2,4,7), (2,9,4),
            (3,7,3), (3,15,2),
            (4,3,1), (4,6,6), (4,5,2),
            (5,5,10), (5,6,7), (5,7,3), (5,9,5);
    -- Actualizacion de precios.
	UPDATE cart AS c SET price = ( SELECT price FROM products AS p 
    WHERE p.id_product = c.id_product ) WHERE price IS NULL;
    -- Creacion de Orden de Compra
    INSERT INTO orders(id_user, id_method, price)
		VALUES ( 1, 1, ( SELECT SUM(quantity * price) FROM cart WHERE id_user = 1 ) );
    -- Carga Detalle de Productos Ordenados
    INSERT INTO orders_detail(id_order, id_product, quantity, price)
    SELECT id_order, id_product, quantity, c.price FROM cart AS c
    JOIN orders AS o ON o.id_user = c.id_user WHERE o.id_user = 1;
    -- Vaciar Carrito de Compras
    DELETE FROM cart WHERE id_user = 1;
/*DML - Consulta de datos ingresados. */		
	SELECT * FROM users;
	SELECT * FROM products;
	SELECT * FROM cart;
	SELECT * FROM orders;
	SELECT * FROM orders_detail;