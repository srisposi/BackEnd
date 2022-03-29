//Jquery
$.ajax({
  method: "GET",
  url: "../../data/db.json",
})
  .done((info) => {
    console.log(info);
    //vehiculo = [...data];
    Cards(info);
  })
  .fail((error) => {
    console.log(error);
  })
  .always(() => {
    console.log(completado);
  });

function Cards(info) {
  const divVehiculos = $("#vehiculosCards");
  $(info).each(function (precios, producto) {
    divproductos.append(`
        <div class="col-sm-3">
        <div class="card" style="width: 100%;height: 100%;">
        <img class="card-img-top p-2" src="../img/iconos/${producto.image}"  alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.name}</h5>
            <p class="item-price">${producto.precio}</p>
            <p class="card-text">${producto.precio} de promoción para los refereifos de autos que se encuentran en el estacionamiento</p>
            <a href="#" class="btn btn-danger">Contratar</a>
        </div>
        </div>
    </div>`);
  });
}
