from flask import Flask, request, jsonify
import sqlite3
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def obtener_conexion():
    conexion = sqlite3.connect("ecouao.db")
    conexion.row_factory = sqlite3.Row
    return conexion

@app.route("/")
def inicio():
    return "Backend de ECOUAO funcionando"

@app.route("/lectura", methods=["POST"])
def guardar_lectura():
    datos = request.get_json()

    temperatura = datos["temperatura"]
    humedad = datos["humedad"]
    luz = datos["luz"]
    fecha_hora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conexion = obtener_conexion()
    conexion.execute(
        "INSERT INTO lecturas (temperatura, humedad, luz, fecha_hora) VALUES (?, ?, ?, ?)",
        (temperatura, humedad, luz, fecha_hora)
    )
    conexion.commit()
    conexion.close()

    return jsonify({"mensaje": "Lectura guardada correctamente"}), 201

@app.route("/historial", methods=["GET"])
def obtener_historial():
    rango = request.args.get("rango", None)

    conexion = obtener_conexion()

    if rango:
        dias = {"24h": 1, "7d": 7, "30d": 30}.get(rango, 1)
        desde = (datetime.now() - timedelta(days=dias)).strftime("%Y-%m-%d %H:%M:%S")
        filas = conexion.execute(
            "SELECT * FROM lecturas WHERE fecha_hora >= ? ORDER BY id ASC",
            (desde,)
        ).fetchall()
    else:
        filas = conexion.execute(
            "SELECT * FROM lecturas ORDER BY id DESC LIMIT 50"
        ).fetchall()
        filas = list(reversed(filas))

    conexion.close()
    return jsonify([dict(f) for f in filas])

if __name__ == "__main__":
    app.run(debug=True, port=5000)