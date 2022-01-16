const fs = require("fs");
class Contenedor {
  constructor(url_archivo) {
    this.url_archivo = url_archivo;
  }

  //Función Primera - Salvar objeto y obtener el id asignado
  /*     async save(Object){
        try {
 */ /*             await fs.promises. */
  //obtener array de ojetos en el archivp
  //obtener maximo id
  //gurdar el proximo id
  //crear nuevo objeto con propiedad id asociando el proximo
  //gurdar en el archivo
  /*             await fs.promises.appendFile('./producto.txt', Object) */
  //retronar el id utilizado
  /*         }
        catch(error){
            console.log(error)
        }
    }
 */
  //Función Segunda - Recive un id y devuelve el objeto con ese id o null si no está
  async getById(Number) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  //Función Tercera - Devuelve un array con los objetos presentes en el archivo
  async getAll() {
    try {
      return fs.promises
        .readFile(this.url_archivo, "utf-8")
        .then((response) => {
          return JSON.parse(response).data;
        });
    } catch (error) {
      console.log(error);
    }
  }

  //Función Quarta - para elimiar buscando un id
  async deleteById() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  //Función Quinta - para eliminar todo
  /*     async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2))
        }
        catch(error){
            console.log(error)
        }
    }
*/
}

let primerProducto = new Contenedor("./productos.txt");

/* primerProducto.save(
    {
        title: 'Compas',
        price: 45.01
    }
)
 */
primerProducto.getAll().then((response) => {
  console.log(response);
});
