import React from 'react'
import { Modal as AntModal } from 'antd'

type Props = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<Props> = ({ showModal, setShowModal, children }) => {
  return (
    <AntModal
      visible={showModal}
      closable={false}
      footer={false}
      onCancel={() => setShowModal(false)}
    >
      {children}
    </AntModal>
  )
}

export default Modal
