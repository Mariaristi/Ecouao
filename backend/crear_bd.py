import sqlite3

conexion = sqlite3.connect("ecouao.db")
cursor = conexion.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS lecturas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperatura REAL NOT NULL,
    humedad REAL NOT NULL,
    luz REAL NOT NULL,
    fecha_hora TEXT NOT NULL
)
""")

conexion.commit()
conexion.close()

print("Base de datos creada correctamente.")