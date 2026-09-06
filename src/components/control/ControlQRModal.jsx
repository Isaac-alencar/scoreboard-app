import { QRCodeSVG } from 'qrcode.react'
import Modal from '../ui/Modal'

/**
 * @param {{
 *   isOpen: boolean
 *   onClose: () => void
 *   url: string
 * }} props
 */
export default function ControlQRModal({ isOpen, onClose, url }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Controlar pelo celular">
      <div className="flex flex-col items-center gap-6">
        <p className="text-center text-sm text-foreground-muted">
          Leia o QR code com a câmera do celular para abrir a tela de controle.
        </p>
        <div className="rounded-lg bg-white p-4">
          <QRCodeSVG value={url} size={200} />
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-center text-sm text-accent hover:underline"
        >
          {url}
        </a>
      </div>
    </Modal>
  )
}
