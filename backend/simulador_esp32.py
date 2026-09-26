import requests
import random
import time

URL = "http://127.0.0.1:5000/lectura"

def generar_lectura():
    return {
        "temperatura": round(random.uniform(20.0, 30.0), 1),
        "humedad": round(random.uniform(40.0, 70.0), 1),
        "luz": round(random.uniform(100, 900), 0),
    }

print("Simulador de ESP32 iniciado. Ctrl+C para detener.")

while True:
    lectura = generar_lectura()
    try:
        respuesta = requests.post(URL, json=lectura)
        print(f"Enviado: {lectura} -> {respuesta.status_code}")
    except requests.exceptions.ConnectionError:
        print("No se pudo conectar al backend. ¿Está corriendo Flask?")
    time.sleep(5)