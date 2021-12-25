class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return console.log(`la persona ${this.nombre} ${this.apellido} es un buen empleado`)
    }

    addMascotas(nombreMascota){
        this.mascotas.push(nombreMascota)
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor})
    }

    getBookNames(){
        let array = []
        for (let item = 0; item < this.libros.length; item++) {
            array.push(this.libros[item].nombre)
         }
        return array 
    }
}

const personaPrimera = new Usuario('José', 'Pekerman', 
[{nombre: "matematica", autor: "Sergio"}, {nombre: "física", autor: "Nico"}], 
["perro", "gato"])


personaPrimera.getFullName();

personaPrimera.addMascotas("loro");

console.log(personaPrimera.countMascotas());

personaPrimera.addBook("química", "Luis");

console.log(personaPrimera.getBookNames());