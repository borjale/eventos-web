document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('eventos.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const eventos = await response.json();
        
        if (!Array.isArray(eventos)) {
            throw new Error('Formato de datos inválido: se esperaba un array');
        }
        
        renderEventos(eventos);
    } catch (error) {
        console.error('Error al cargar eventos:', error);
        document.getElementById('eventos').innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Error al cargar los eventos: ${error.message}
                </div>
            </div>
        `;
    } finally {
        document.body.classList.remove('hidden');
    }
});

function renderEventos(eventos) {
    const container = document.getElementById('eventos');
    
    if (eventos.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    No hay eventos disponibles actualmente
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = eventos.map(evento => `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${evento.titulo || 'Evento sin título'}</h5>
                    ${evento.fecha ? `<p class="card-text"><small class="text-muted">${formatFecha(evento.fecha)}</small></p>` : ''}
                    ${evento.fuente ? `<p class="card-text"><em>Fuente: ${evento.fuente}</em></p>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function formatFecha(fechaStr) {
    try {
        return new Date(fechaStr).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return fechaStr;
    }
}
