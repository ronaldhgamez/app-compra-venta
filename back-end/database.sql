CREATE EXTENSION pgcrypto;  -- Encriptar contraseñas

CREATE TABLE Usuarios (
	nombre 		VARCHAR 		NOT NULL,
	apellidos	VARCHAR			NOT NULL,
	biografia	VARCHAR			DEFAULT '',
	numerotel	VARCHAR			NOT NULL,
	imagen 		BYTEA 			NULL,	-- imagen perfin
	usuario		VARCHAR 		NOT NULL UNIQUE, -- credenciales
	contrasena	TEXT			NOT NULL,
	PRIMARY KEY (usuario)
);

CREATE TABLE Productos (
	id			SERIAL 			PRIMARY KEY,
	usuario 	VARCHAR			NOT NULL,
	descripcion VARCHAR 		NOT NULL,
	precio 		INT				NOT NULL,
	CONSTRAINT fk_usuario FOREIGN KEY(usuario) 
	REFERENCES usuarios (usuario) ON DELETE CASCADE
);

CREATE TABLE ImagenProducto (
	id_producto		INT			NOT NULL,
	imagen 			BYTEA 		NOT NULL,
	CONSTRAINT fk_idProducto FOREIGN KEY(id_producto) 
	REFERENCES Productos (id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION validarUsuario (usuario_v VARCHAR, contrasena_v VARCHAR)
    RETURNS BOOLEAN
    LANGUAGE 'plpgsql'
AS
$BODY$
BEGIN
	IF EXISTS(SELECT nombre FROM usuarios WHERE usuario = usuario_v AND contrasena = crypt(contrasena_v, contrasena)) THEN
		RETURN TRUE;
	END IF;
	RETURN FALSE;
END
$BODY$;

SELECT validarUsuario('Ronaldhg', '0010') AS existe
SELECT validarUsuario('Ronaldhg', '12345')

SELECT * FROM usuarios;
SELECT * FROM productos;
SELECT * FROM imagenproducto;

--DROP TABLE USUARIOS CASCADE
--DROP TABLE productos CASCADE
--DROP TABLE imagenproducto CASCADE

INSERT INTO usuarios (nombre, apellidos, numerotel, usuario, contrasena)
VALUES ('Ronald', 'Herrera Gámez', '60102586', 'ronaldhg', crypt('12345', gen_salt('bf')));
INSERT INTO usuarios (nombre, apellidos, numerotel, usuario, contrasena)
VALUES ('Alicia', 'Diaz', '80102586', 'diazr', crypt('12345', gen_salt('bf')));

DELETE FROM usuarios WHERE usuario = 'ronaldhg';

-- FORMA DE VALIDAR LA CLAVE:
SELECT * FROM usuarios WHERE usuario = 'ronaldhg' AND contrasena = crypt('123454', contrasena);

INSERT INTO productos (usuario, descripcion, precio)
VALUES ('ronaldhg', 'Televisor nuevo Samsung', 80000)

INSERT INTO ImagenProducto (id_producto, imagen)
VALUES(1, bytea('C:\Users\Ronaldhg\Downloads\engranaje2.png'));

select decode('YmFzZTY0IGVuY29kZWQgc3RyaW5n', 'base64');
select encode('base64 encoded string', 'base64');

