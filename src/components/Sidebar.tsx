import { HomeIcon, ActivityIcon, HistoryIcon, LeafIcon, CloseIcon } from './icons'

export type SectionId = 'inicio' | 'monitoreo' | 'historial'

const NAV_ITEMS: { id: SectionId; label: string; icon: typeof HomeIcon }[] = [
  { id: 'inicio', label: 'Inicio', icon: HomeIcon },
  { id: 'monitoreo', label: 'Monitoreo en Vivo', icon: ActivityIcon },
  { id: 'historial', label: 'Historial', icon: HistoryIcon },
]

interface SidebarProps {
  active: SectionId
  onNavigate: (id: SectionId) => void
  open: boolean
  onClose: () => void
}

export default function Sidebar({ active, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white border-r border-black/5 px-4 py-6 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-eco-primary text-white">
              <LeafIcon width={22} height={22} />
            </div>
            <div>
              <p className="text-lg font-extrabold leading-none text-gray-800">ECO UAO</p>
              <p className="text-xs font-medium text-gray-400">Computación Física</p>
            </div>
          </div>
          <button
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 lg:hidden"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200
                ${
                  isActive
                    ? 'bg-eco-primary text-white shadow-card'
                    : 'text-gray-500 hover:bg-eco-pale hover:text-gray-800'
                }`}
              >
                <Icon
                  width={18}
                  height={18}
                  className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-eco-primary'}
                />
                {label}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto rounded-2xl bg-eco-pale p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-green-800">Universidad</p>
          <p className="mt-1 text-sm font-semibold text-gray-700">
            Autónoma de Occidente
          </p>
          <p className="mt-1 text-xs text-gray-500">Cali, Valle del Cauca</p>
        </div>
      </aside>
    </>
  )
}
