import Button from '../ui/Button'
import Modal from '../ui/Modal'

/**
 * @param {{
 *   isOpen: boolean
 *   onClose: () => void
 *   onConfirm: () => void
 *   loading?: boolean
 * }} props
 */
export default function FinishGameModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Finalizar jogo">
      <p className="mb-6 text-foreground-muted">
        Tem certeza? Isso encerra o jogo e salva o placar final no histórico.
      </p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          className="bg-danger hover:bg-danger/90"
        >
          {loading ? 'Finalizando...' : 'Finalizar'}
        </Button>
      </div>
    </Modal>
  )
}
