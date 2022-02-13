const socket = io.connect();

let renderTabla = Handlebars.compile(`<style>
.table td, .table th {
    vertical-align: middle;
}
h1 {
    color: red;
}
hr {
    background-color: #ddd;
}
.jumbotron {
    min-height: 100vh;
}
</style>

<div class="jumbotron">
<h1>Productos</h1>
<br>

{{#if ProductExist}} 
    <div class="table-responsive">
        <table class="table table-dark">
            <tr> <th>Nombre</th> <th>Precio</th> <th>Imagen</th></tr>
            {{#each productos}}
                <tr> <td>{{this.title}}</td> <td>$ {{this.price}}</td> <td><img width="50" src={{this.thumbnail}} alt="not found"></td> </tr>
            {{/each}}
        </table>
    </div>
{{else}}  
    <h3 class="alert alert-warning">No se encontraron productos</h3>
{{/if}}
</div>`);

socket.on("content", ({ ProductExist, productos }) => {
  let contenido = renderTabla({ ProductExist, productos });
  document.querySelector("#tablaDinamica").innerHTML = contenido;
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const image = document.querySelector("#image").files[0].name;
  objeto = { title: nombre, price: price, images: image };

  fetch("/api/productos/guardar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objeto),
  })
    .then(() => socket.emit("contentSent"))
    .catch((e) => console.log("error: ", e));
});

socket.on("messages", (data) => {
  render(data);
});

function render(data) {
  var html = data
    .map((elem, index) => {
      return `<div>
            <strong class='styloMail' >${elem.author}</strong>
            <span class='styloFecha'>[${elem.date}]</span>
            <p class="styloP">${elem.text}</p>
            </div>
        `;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

document.querySelector("#formulario").addEventListener("submit", (e) => {
  e.preventDefault();
  fecha = new Date().toLocaleString();
  var mensaje = {
    author: document.getElementById("usermail").value,
    text: document.getElementById("texto").value,
    date: fecha,
  };
  socket.emit("new-message", mensaje);
  document.getElementById("texto").value = "";
  document.getElementById("texto").focus();
  return false;
});
