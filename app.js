// app.js
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/tuusuario/eventos-web/main/eventos.json')
    .then(response => response.json())
    .then(data => {
      const contenedor = document.getElementById('eventos');
      data.forEach(evento => {
        contenedor.innerHTML += `
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${evento.titulo}</h5>
                <p class="card-text">
                  <small class="text-muted">${new Date(evento.fecha).toLocaleDateString()}</small><br>
                  <em>Fuente: ${evento.fuente}</em>
                </p>
              </div>
            </div>
          </div>
        `;
      });
    });
});
