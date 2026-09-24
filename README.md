# ECO UAO — Dashboard

Dashboard interactivo para el sistema **ECO UAO**, un proyecto de monitoreo ambiental
con computación física desarrollado en la Universidad Autónoma de Occidente (Cali,
Colombia). Visualiza temperatura, humedad e iluminación capturadas por un nodo físico
(ESP32 + sensores DHT22 y LDR).

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Recharts

## Estructura

- **Inicio** — resumen general, KPIs actuales y estado del nodo.
- **Monitoreo en Vivo** — valores en tiempo real (mock cada 3s) con gráficas y alertas.
- **Historial** — filtros por rango (24h / 7d / 30d), tendencias y tabla exportable a CSV.

Actualmente el dashboard usa **datos mock** para simular las lecturas del nodo. La
estructura de datos (`src/types/sensor.ts`) está preparada para conectarse a un backend
Flask + SQLite vía API REST.

## Desarrollo

```bash
npm install
npm run dev
```

## Variables monitoreadas

| Variable      | Rango óptimo | Alerta            |
| ------------- | ------------ | ------------------ |
| Temperatura   | 20°C – 26°C  | Fuera de rango     |
| Humedad       | 40% – 60%    | Fuera de rango     |
| Iluminación   | Según LDR    | Baja / insuficiente|
