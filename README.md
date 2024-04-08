# Sistema de Gestión de Usuarios

Este proyecto es un sistema de gestión de usuarios con autenticación, desarrollado como parte de una prueba técnica. 


## Backend

### 1. Navega hasta el backend
    cd backend

### 2. Instalacion dependencias
    Instala las dependencias con el comando
    ``` npm i ```

### 3. Configuracion para postgress
    La base de datos se encuentrra en la nube por lo que solo deberas agregar el archivo .env

### 4. Seeders
    Para inicializar los Seeders correo el comando 
    ``` npm run seed ```

### 5. Corre el Backend 
    Para ejecutar el backend corre la siguinete linea a la altura del backend
    ``` npm run dev ```
    ¡Listo, la base de tatos ya se puede usar!

    Al correr los Seeder en el anterior paso nos dio dos usuarios
    
    Usuario Administrador:
    - Correo: admin@mail.com
    - Contraseña: 123456

    Usuario:
    - Correo: user@mail.com
    - Contraseña: 123456


## Frontend
En otra consola

### 1. Navega hasta el frontend
    cd frontend

### 2. Instalacion dependencias
    Instala las dependencias con el comando
    ``` npm i ```

### 3. Corre el Frontend
    Para ejecutar el Frontendcorre la siguinete linea a la altura del frontend
    ``` npm run dev ```


## Construido con

* [React] - El framework web usado
* [Redux] - Manejo de estado
* [Express] - El framework de servidor
* [PostgreSQL] - Sistema de gestión de bases de datos
* [Material-UI (MUI)] - Biblioteca de componentes de React 
* [Tailwind CSS] - Un framework de CSS para diseñar rápidamente sitios web
* [jsonwebtoken] - Utilizado para implementar autenticación JWT
* [Sequelize] ORM para Node.js, utilizado para la gestión de base de datos
* [bcryptjs] - Librería para hash de contraseñas
* [Axios] - Cliente HTTP 
* [Vite] - Servidor de desarrollo
