import { X } from 'lucide-react'

/**
 * @param {{
 *   isOpen: boolean
 *   onClose: () => void
 *   title?: string
 *   children: React.ReactNode
 * }} props
 */
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        role="presentation"
      />
      <div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="ml-auto rounded p-1 text-foreground-muted hover:bg-surface-hover hover:text-foreground"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
