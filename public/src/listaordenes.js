let isAdmin = false;

function renderOrdenes() {
  const tabla = document.getElementById("tBodyChat");
  let url = "/api/ordenes";
  if (isAdmin) {
    url = `/api/ordenes/all`;
  }

  /* Funcion fetch para traerme el historial de chat mediante GET */
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      /* Todo OK borro el contenido viejo de la tabla y escribo el nuevo */
      tabla.innerHTML = "";
      console.log(data);
      for (const orden of data) {
        let fila = document.createElement("tr");
        let aux1 = document.createElement("td");
        aux1.innerHTML = `${orden.timestamp}`;
        let aux2 = document.createElement("td");
        aux2.innerHTML = `${orden.id}`;
        let aux3 = document.createElement("td");
        aux3.innerHTML = `${orden.estado}`;
        let aux4 = document.createElement("td");
        aux4.innerHTML = `${orden.direccion}`;
        fila.appendChild(aux1);
        fila.appendChild(aux2);
        fila.appendChild(aux3);
        fila.appendChild(aux4);
        tabla.appendChild(fila);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  return false;
}

function main() {
  const url = "/login";
  const options = {
    method: "GET",
  };
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      if (data) {
        if (data.isAdmin) {
          isAdmin = true;
        }
        renderOrdenes();
      } else {
        //window.location.href = "login.html";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
