let { db: firebaseDB } = require("./index");

(async () => {
    try {
        let productosArray = [
            {
                nombre: "compas",
                stock: "2",
                precio: "3",
                descripcion: "Todo bien",
            }
        ];
        let producto = firebaseDB.collection('producto');
        for (const element of productosArray) {
            await producto.doc().set(element);
        }
        let db_array_productos = [];
        
        //Listar todos los productos
        let res = await producto.get();
        res.forEach(element => {
            db_array_productos.push({id:element.id, ...element.data()});
        })
        console.log(db_array_productos);
        
        //Eliminar
        await producto.doc('UUF23BNfFeF9qg2i8BuC').delete();
        
        //Update
        await producto.doc('xts2Gh26hGt0V2iLvNnl').update({nombre: "Escalera"});    
    } catch (error) {
        console.log(error)
        
    }
})()
