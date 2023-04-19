import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

type VariantType = 'primary' | 'danger';

interface ConfirmationModalProps {
  title: string;
  message: string;
  confirmBtnText: string;
  isModalVisible: boolean;
  variant: VariantType,
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({ isModalVisible, title, message, confirmBtnText, variant='primary', onConfirm, onCancel }: ConfirmationModalProps) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(isModalVisible)
  }, [isModalVisible])

  const handleConfirm = () => {
    onConfirm()
    setShowModal(false)
  }

  const handleCancel = () => {
    onCancel()
    setShowModal(false)
  }

  return (
    <Modal show={showModal} onHide={() => handleCancel()}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button variant={variant} onClick={handleConfirm}>
          {confirmBtnText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
