# Javascript-lab15

## Módulo 5: Javascript en el Servidor
Conocer las diferentes posibilidades de Javascript en el servidor

### Unidad 5: Express II
Crear un servidor para exponer operaciones CRUD sobre un recurso con buenas prácticas												

👀 Instrucciones 👀 

Pre-requisitos

- Postman
- DB Browser for SQLite

### Instalación y correr proyecto

- npm install
- npm run dev

### Servidor estático

- analizar que pasa al entrar a http://localhost:3000
- experimentar con la carpeta public y assets
- solucionar la carga del script `app.js` en el frontend

### Rutas para administrar información

- analizar que pasa al entrar a http://localhost:3000/api/v1/artists
- crear una lista de artistas con id, name, description, code y image, y aplicar las operaciones sobre la lista en cada ruta


### Rutas para administrar información de base de datos

- Instalar Sequelize con el comando: 

```
  npm i sequelize
```

- Instalar la linea de comandos de sequelize y una base de datos de desarrollo

```
  npm i sequelize-cli sqlite3 --save-dev
```

- Agregar script `sequelize` en la sección "scripts" del archivo `package.json`

```json
  "scripts": {
    ...
    "sequelize": "sequelize"
    ...
  }
```

- crear en la raíz el archivo `.sequelizerc` con el siguiente contenido:

```
const path = require('path')

module.exports = {
 'config': path.resolve('./src/config', 'config.json'),
 'models-path': path.resolve('./src/models'),
 'seeders-path': path.resolve('./src/seeders'),
 'migrations-path': path.resolve('./src/migrations')
}
```

- ahora ejecutaremos el siguiente comando:

```
npm run sequelize init
```

- analizaremos las carpetas que nos creo automaticamente este último comando
- vamos al archivo `src/config/config.json` y modificamos la sección "development"

```
"development": {
  "username": "root",
  ...
  "host": "local.database.sqlite3",
  "dialect": "sqlite"
},
```
- Vamos a crear nuestro primer modelo utilizando el siguiente comando. A poner atención a cada una de sus partes:

```
npm run sequelize model:generate -- --name Artist --attributes name:string,description:string,code:string,image:string
```

- Sequelize agrega por defecto el atributo id de típo numérico autoincremental y considera el caso de los atributos created_at y updated_at. El valor por defecto de estos dos atributos debemos establecerlos nosotros. Vamos al archivo de modelo creado y agregaremos lo siguiente:

```
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), 
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  }
```

- Ahora podemos crear nuestra primera tabla en la base de datos a partir del modelo utilizando el siguiente comando:

```
npm run sequelize db:migrate
```

- Ahora vamos a poblar la tabla utilizando el siguiente procedimiento:

```
npm run sequelize seed:generate -- --name load-artists
```

- Para poder agregar información utilizaremos un código como el siguiente procurando crar las variables `tableName` y `artists`:

```
  up: async (queryInterface) => {
    await queryInterface.bulkDelete(tableName, null, { truncate: true })
    await queryInterface.bulkInsert(tableName, artists, {})
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete(tableName, null, { truncate: true })
  }
```

- Finalmente ya podremos aplicar la información:

```
npm run sequelize db:seed:all
```

- Podemos echar un vistazo utilizando la herramienta DB Browser for sqlite

- Ahora agregaremos el archivo local.database.sqlite3 a .gitignore


- Utilizaremos las funciones definidas en la documentación para completar todas las operaciones CRUD

https://sequelize.org/master/class/lib/model.js~Model.html

¡ Éxito con la creación de tu primer proyecto con NODEJS! 🚀🚀

