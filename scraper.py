import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

# Ejemplo: Extraer eventos de teatroscanal.com
url = "https://www.teatroscanal.com"
response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
soup = BeautifulSoup(response.text, 'html.parser')

eventos = []
for evento in soup.find_all('div', class_='evento'):  # Ajusta este selector
    titulo = evento.find('h3').text.strip()
    fecha = evento.find('time')['datetime']
    eventos.append({
        'titulo': titulo,
        'fecha': fecha,
        'fuente': url
    })

# Guardar en JSON
with open('eventos.json', 'w', encoding='utf-8') as f:
    json.dump(eventos, f, ensure_ascii=False)