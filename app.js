document.addEventListener('DOMContentLoaded', function() {
  const PROXY_URL = 'https://api.allorigins.win/raw?url=';
  const JSON_URL = 'https://raw.githubusercontent.com/tuusuario/eventos-web/main/eventos.json';
  
  fetch(PROXY_URL + encodeURIComponent(JSON_URL))
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then(data => {
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format');
      }
      
      const container = document.getElementById('eventos');
      container.innerHTML = data.map(evento => `
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${evento.titulo || 'Sin título'}</h5>
              <p class="card-text">
                ${evento.fecha ? `<small class="text-muted">${new Date(evento.fecha).toLocaleDateString()}</small><br>` : ''}
                <em>Fuente: ${evento.fuente || 'Desconocida'}</em>
              </p>
            </div>
          </div>
        </div>
      `).join('');
      
      document.body.classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('eventos').innerHTML = `
        <div class="alert alert-danger">
          Error al cargar eventos: ${error.message}
        </div>
      `;
      document.body.classList.remove('hidden');
    });
});
