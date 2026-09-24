interface TooltipProps {
  text: string
}

export default function Tooltip({ text }: TooltipProps) {
  return (
    <span className="group/tooltip relative inline-flex">
      <span className="flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-500 transition-colors duration-200 hover:bg-eco-primary hover:text-white">
        ?
      </span>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-lg bg-gray-800 px-3 py-2 text-center text-xs font-medium leading-snug text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/tooltip:opacity-100">
        {text}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
      </span>
    </span>
  )
}
