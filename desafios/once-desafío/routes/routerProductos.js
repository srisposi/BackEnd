const express = require ('express');
const routerProductos = express.Router();

const Producto = require ('../api/Producto')

const producto = new Producto();


routerProductos.get('/productos/listar', (req, res)=>{
    let respuesta = producto.listar();
    res.json(respuesta);
})


routerProductos.get('/productos/listar/:id', (req,res)=>{
    let response = producto.listar_id(req.params.id);
    res.json(response)
})


routerProductos.post('/productos/guardar', (req, res)=>{
    let productoAgregar = req.body;
    let respuesta = producto.agregar(productoAgregar);
    res.redirect('/');
})

routerProductos.delete('/productos/borrar/:id', (req, res) => {
    let response = producto.borrar(req.params.id);
    res.json(response);
})

routerProductos.put('/productos/actualizar/:id', (req, res)=> {
    let response = producto.update(req.params.id, req.body);
    res.json(response);
})

module.exports = {routerProductos, producto};