import { BellIcon, MenuIcon, SearchIcon } from './iconos'

interface EncabezadoProps {
  onMenuClick: () => void
}

export default function Encabezado({ onMenuClick }: EncabezadoProps) {
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
        <h1 className="text-lg font-extrabold text-gray-800 sm:text-xl">Hola, UAO 👋</h1>
        <p className="hidden text-sm text-gray-400 sm:block">
          Monitoreo ambiental del nodo ECO UAO en tiempo real
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 md:flex">
          <SearchIcon width={16} height={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar métrica, nodo..."
            className="w-48 bg-transparent text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <button
          className="relative rounded-xl bg-gray-100 p-2.5 text-gray-500 hover:bg-eco-pale hover:text-green-800"
          aria-label="Notificaciones"
        >
          <BellIcon width={18} height={18} />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-eco-primary ring-2 ring-white" />
        </button>

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
