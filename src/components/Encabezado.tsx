import { useEffect, useRef, useState } from 'react'
import { BellIcon, MenuIcon, SearchIcon } from './iconos'
import type { SectionId } from './BarraLateral'
import type { Notification } from '../types/sensor'

interface EncabezadoProps {
  onMenuClick: () => void
  onNavigate: (id: SectionId) => void
  notifications: Notification[]
}

interface ResultadoBusqueda {
  label: string
  section: SectionId
}

const ITEMS_BUSCABLES: ResultadoBusqueda[] = [
  { label: 'Inicio', section: 'inicio' },
  { label: 'Monitoreo en Vivo', section: 'monitoreo' },
  { label: 'Historial', section: 'historial' },
  { label: 'Temperatura', section: 'monitoreo' },
  { label: 'Humedad', section: 'monitoreo' },
  { label: 'Iluminación', section: 'monitoreo' },
  { label: 'Exportar CSV', section: 'historial' },
  { label: 'Estado del nodo', section: 'inicio' },
]

const ESTILO_NIVEL: Record<Notification['level'], string> = {
  ok: 'bg-eco-primary',
  warn: 'bg-eco-warn',
  danger: 'bg-red-500',
}

export default function Encabezado({ onMenuClick, onNavigate, notifications }: EncabezadoProps) {
  const [notifAbierto, setNotifAbierto] = useState(false)
  const [busquedaAbierta, setBusquedaAbierta] = useState(false)
  const [consulta, setConsulta] = useState('')

  const notifRef = useRef<HTMLDivElement>(null)
  const busquedaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function manejarClickAfuera(evento: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(evento.target as Node)) {
        setNotifAbierto(false)
      }
      if (busquedaRef.current && !busquedaRef.current.contains(evento.target as Node)) {
        setBusquedaAbierta(false)
      }
    }
    document.addEventListener('mousedown', manejarClickAfuera)
    return () => document.removeEventListener('mousedown', manejarClickAfuera)
  }, [])

  const resultados = ITEMS_BUSCABLES.filter((item) =>
    item.label.toLowerCase().includes(consulta.toLowerCase()),
  )

  const irAResultado = (section: SectionId) => {
    onNavigate(section)
    setConsulta('')
    setBusquedaAbierta(false)
  }

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-black/5 bg-white/80 px-4 py-4 backdrop-blur lg:px-8">
      <button
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
        onClick={onMenuClick}
        aria-label="Abrir menú"
      >
        <MenuIcon />
      </button>

      <div>
        <h1 className="text-lg font-extrabold text-gray-800 sm:text-xl">Hola, UAO</h1>
        <p className="hidden text-sm text-gray-400 sm:block">
          Monitoreo ambiental del nodo ECO UAO en tiempo real
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div ref={busquedaRef} className="relative hidden md:block">
          <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2">
            <SearchIcon width={16} height={16} className="text-gray-400" />
            <input
              type="text"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              onFocus={() => setBusquedaAbierta(true)}
              placeholder="Buscar métrica, nodo..."
              className="w-48 bg-transparent text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none"
            />
          </div>

          {busquedaAbierta && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-black/5 bg-white p-2 shadow-cardHover">
              {resultados.length === 0 ? (
                <p className="px-3 py-2 text-sm text-gray-400">Sin resultados</p>
              ) : (
                resultados.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => irAResultado(item.section)}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-600 hover:bg-eco-pale hover:text-green-800"
                  >
                    {item.label}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div ref={notifRef} className="relative">
          <button
            className="relative rounded-xl bg-gray-100 p-2.5 text-gray-500 hover:bg-eco-pale hover:text-green-800"
            aria-label="Notificaciones"
            onClick={() => setNotifAbierto((abierto) => !abierto)}
          >
            <BellIcon width={18} height={18} />
            {notifications.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-eco-primary ring-2 ring-white" />
            )}
          </button>

          {notifAbierto && (
            <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-black/5 bg-white p-2 shadow-cardHover">
              <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-400">
                Notificaciones
              </p>
              {notifications.length === 0 ? (
                <p className="px-3 py-2 text-sm text-gray-400">No hay notificaciones nuevas</p>
              ) : (
                <ul className="flex max-h-72 flex-col gap-1 overflow-y-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className="flex items-start gap-2 rounded-lg px-3 py-2 hover:bg-gray-50">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${ESTILO_NIVEL[n.level]}`} />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{n.title}</p>
                        <p className="text-xs text-gray-500">{n.message}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-gray-100 py-1.5 pl-1.5 pr-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-eco-primary text-sm font-bold text-white">
            UAO
          </div>
          <span className="hidden text-sm font-semibold text-gray-700 sm:block">Admin</span>
        </div>
      </div>
    </header>
  )
}
