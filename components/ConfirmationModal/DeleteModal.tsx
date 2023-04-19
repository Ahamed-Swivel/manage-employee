import React from 'react'
import ConfirmationModal from './Modal'

interface DeleteModalProps {
  isModalVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({onConfirm, onCancel, isModalVisible}: DeleteModalProps) =>
  <ConfirmationModal
    isModalVisible={isModalVisible}
    title="Confirm Delete"
    message="Are you sure you want to delete this employee?"
    confirmBtnText="Delete"
    variant="danger"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />

export default DeleteModal
