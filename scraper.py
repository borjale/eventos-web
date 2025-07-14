import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

url = "https://www.teatroscanal.com"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Lanza error si la petición falla
    soup = BeautifulSoup(response.text, 'html.parser')
    
    eventos = []
    
    # Ajusta este selector según la estructura actual de teatroscanal.com
    for evento in soup.find_all('div', class_='tribe-events-event'):  # ¡CAMBIAR ESTE SELECTOR!
        try:
            titulo = evento.find('h2', class_='show-home').text.strip()
            # Opción 1: Si usan <time datetime="">
            time_tag = evento.find('time')
            fecha = time_tag['datetime'] if time_tag and time_tag.has_attr('datetime') else None
            
            # Opción 2: Si muestran la fecha en texto
            if not fecha:
                fecha_text = evento.find('span', class_='fecha-show').text.strip() if evento.find('span', class_='fecha') else None
                if fecha_text:
                    try:
                        fecha = datetime.strptime(fecha_text, '%d/%m/%Y').isoformat()
                    except ValueError:
                        fecha = fecha_text
            
            eventos.append({
                'titulo': titulo,
                'fecha': fecha,
                'fuente': url
            })
            
        except Exception as e:
            print(f"Error procesando un evento: {str(e)}")
            continue
            
    # Guardar en JSON
    with open('eventos.json', 'w', encoding='utf-8') as f:
        json.dump(eventos, f, ensure_ascii=False, indent=2)
        
except Exception as e:
    print(f"Error general: {str(e)}")
    # Crear archivo vacío si falla todo
    with open('eventos.json', 'w', encoding='utf-8') as f:
        json.dump([], f)
