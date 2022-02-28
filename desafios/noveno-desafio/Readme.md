## Una vez instalado mongo ejecutar los comandos:

- mongod => para iniciar el servidor de mongo
- mongo => para poder usar mongo

#1. Creamos la base de datos en mongo llamada Ecommerce

- use ecommerce

## vemos las base de datos creadas (si no tiene datos no aparece la db)

- show databases

## Para insertar los primeros datos con

db.ecommerce.insertOne({})
db.ecommerce.insertMany({})

## Antes de hacer la carga de datos, definimos la estrucutra de la base creando las colecciones que tendremos adentro: Productos y mensajes.

use ecommerce
db.createCollection('productos')
db.createCollection('mensajes')

show collections;
db.productos.insertMany([{}])

#3. Listar los documentos de cada colección:

db.productos.find.pretty();

#4. Para mostrar la cantidad de documentos en cada collección:

db.productos.count();

#5. CRUD sobre las colleciones creadas:
a. Agregar un producto más en la colección de productos.

         db.productos.insertOne({});

    b. Realizar una consulta por nombre de producto específico:
    i. Listar los productos con precio menor a 1000 pesos:

             db.productos.find({"nombre": "pisapapel"}).pretty();

        ii. Listar los productos con precios entre los 1000 a 3000 pesos.

            db.productos.find({$and[{"precio": {$gt :1000}}, {"precio":{$lt: 3000}]}).pretty();

        iii. Listar los productos con precio mayor a 3000 pesos.

            db.productos.find({"precio": {$gt:3000}}).pretty();

        iv. Realizar una  consulta que traiga sólo el nombre del tercer producto más barato.

            db.productos.find({}).sort({"precio": 1}).limit(1).skip(3).pretty();

    c) Hacer una actualización sobre los productos, agregando el campo stock a todos ellos con un vaor de 100.

            db.productos.updateMany({} , {$set: {"stock": 100}}, {upsert:true})

    d) Cambiar el stock a cero de los productos con precios mayores a los 4000 pesos

            db.productos.updateMany({"precio": {$gt:4000}},{$set: {"stock":0}});

    e) Borar los productos con precio menor a 1000 pesos.

            db.productos.deleteMany({"precio": {$lt: 1000}})

#6) Crear un usuario 'pepe' clave:'asd456' que sólo pueda leer la base de datos ecommerce, Verificar que pepe no pueda cambiar la información.

db.createUser({"user": "pepe", "pwd": "asd456", roles:[{role: "read", db: "ecommerce"}]});
