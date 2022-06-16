class DTO {
    getPersonas(obj){
        let res = [];
        if(obj.length) > 0) {

            obj.forEach(e => {
                res.push({
                    nombre: e.nombre,
                    apellido: e.apellido,
                    dni: e.dni
                })
            });
        }
        return res;
    }
}

module.exports = new DTO();