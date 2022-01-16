let fs = require("fs");
//let os = require("os");

class ManejadorArchivos{
    constructor(url_archivo){
        this.archivo = url_archivo;
    }
    create(){
        try{
            let insertData = new Date();
            return fs.writeFileSync(`${this.archivo}`, `${insertData}`, 'utf-8');
        } catch (error){
            console.log(error);
        }
    }
    read(){
        try{
            return fs.readFileSync(`${this.archivo}`, 'utf-8');
        } catch (error){
            console.log(error);
        }
    }
}

let controlador = new ManejadorArchivos("./fyh.txt");
//let res = controlador.create();
let res2 = constrolador.read();
//console.log(res);
console.log(res2);

//===================================
